import { GameConnectionManager } from "./GameConnectionManager.js";
import { Player } from "./Player.js";
import {
    LocationId,
    PlayerInfluence,
    Side,
    User,
    Token,
    ControlToken,
    StateChange,
    StateChangeType,
} from "../types.js";
import {
    getRandomBonusesForProvinces,
    makeBonusToken,
    makeControlToken,
} from "../utils.js";
import { borderProvincesDictionary, provinces } from "../static/provinces.js";
import { Province } from "./Province.js";

export class Game {
    inProgress: boolean = false;
    players: Record<User, Player> = {};
    playersBySide: Record<Side, Player>;
    opponents: Record<User, User> = {};
    connectionManager: GameConnectionManager = new GameConnectionManager();
    provinces: Record<LocationId, Province> = {};
    borders: Record<LocationId, PlayerInfluence | ControlToken> = {};
    private unsortedStateChanges: StateChange[] = [];

    get ready() {
        const enoughPlayers =
            Object.keys(this.connectionManager.connections).length >= 2;

        return enoughPlayers && this.connectionManager.allConnectionsOnline;
    }

    get state(): Record<LocationId, Token> {
        const provinceState = Object.entries(this.provinces).reduce(
            (acc, [provinceId, province]) => {
                if (!province.closed) {
                    acc[provinceId] = makeBonusToken(province.bonus);
                } else if (province.controlledBy) {
                    acc[provinceId] = makeControlToken(province.controlledBy);
                }

                return acc;
            },
            {}
        );

        return { ...this.borders, ...provinceState };
    }

    get stateChanges(): StateChange[] {
        const changesWithBonusesFirst = this.unsortedStateChanges.sort(
            (changeA, changeB) => {
                if (changeB.type === StateChangeType.CONTROL) {
                    if (changeA.type === StateChangeType.BONUS) {
                        return -1;
                    }

                    //provinces first, then borders
                    if (
                        changeA.type === changeB.type &&
                        !changeA.location.includes("-") &&
                        changeB.location.includes("-")
                    ) {
                        return -1;
                    }
                }
            }
        );

        return changesWithBonusesFirst;
    }

    addOrReconnectPlayer = (user: User, socket) => {
        if (this.connectionManager.connections[user]) {
            this.connectionManager.reconnect(user, socket);
        } else {
            this.connectionManager.addConnection(user, socket);
        }
    };

    private initProvinces() {
        const bonusByProvince = getRandomBonusesForProvinces();

        for (let province of provinces) {
            this.provinces[province] = new Province(
                province,
                bonusByProvince[province]
            );
        }
    }

    private initPlayers() {
        const users = this.connectionManager.users;
        this.opponents[users[0]] = users[1];
        this.opponents[users[1]] = users[0];

        const caesar = new Player(Side.CAESAR);
        const pompey = new Player(Side.POMPEY);
        this.players[users[0]] = caesar;
        this.players[users[1]] = pompey;

        this.playersBySide = { [Side.CAESAR]: caesar, [Side.POMPEY]: pompey };

        this.players[users[0]].playersTurn = true;
    }

    start() {
        this.inProgress = true;
        this.initProvinces();
        this.initPlayers();
    }

    getOpponentPlayer(user) {
        return this.players[this.opponents[user]];
    }

    private placeToken(token: PlayerInfluence, location: LocationId) {
        const provinces = borderProvincesDictionary[location].map(
            (borderProvince) => this.provinces[borderProvince]
        );

        this.borders = { ...this.borders, [location]: token };

        provinces.forEach((province) => {
            province.tryCloseBorder(location, token);

            if (province.closed) {
                this.unsortedStateChanges.push({
                    type: StateChangeType.BONUS,
                    token: makeBonusToken(province.bonus),
                    location: province.id,
                    side: province.closedBy,
                });

                if (province.controlledBy) {
                    const controllingPlayer =
                        this.playersBySide[province.controlledBy];
                    controllingPlayer.establishControl();

                    this.unsortedStateChanges.push({
                        type: StateChangeType.CONTROL,
                        location: province.id,
                        side: province.controlledBy,
                    });

                    let controlledBorders: LocationId[] = [];

                    province.potentiallyClosedNeighbors.forEach(
                        (neighborId) => {
                            const neighbor = this.provinces[neighborId];
                            if (
                                neighbor.controlledBy === province.controlledBy
                            ) {
                                controlledBorders.push(
                                    province.borders.find((borderId) =>
                                        neighbor.borders.includes(borderId)
                                    )
                                );
                            }
                        }
                    );

                    if (controlledBorders.length) {
                        controlledBorders.forEach((border) => {
                            controllingPlayer.establishControl();

                            this.unsortedStateChanges.push({
                                type: StateChangeType.CONTROL,
                                location: border,
                                side: province.controlledBy,
                            });
                        });

                        this.borders = {
                            ...this.borders,
                            ...Object.fromEntries(
                                controlledBorders.map((border) => [
                                    border,
                                    makeControlToken(province.controlledBy),
                                ])
                            ),
                        };
                    }
                }
            }
        });
    }

    endUserTurn(
        user: User,
        { token, location }: { token: PlayerInfluence; location: LocationId }
    ): Province | void {
        this.unsortedStateChanges = [];
        const activePlayer = this.players[user];
        activePlayer.endTurn(token.id);
        this.getOpponentPlayer(user).playersTurn = true;
        this.placeToken(token, location);
    }
}
