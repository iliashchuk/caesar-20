import { GameConnectionManager } from "./GameConnectionManager.js";
import { Player } from "./Player.js";
import { LocationId, PlayerInfluence, Side, User, Token } from "../types.js";
import { getRandomBonusesForProvinces } from "../utils.js";
import { borderProvincesDictionary, provinces } from "../static/provinces.js";
import { Province } from "./Province.js";

export class Game {
    inProgress: boolean = false;
    players: Record<User, Player> = {};
    opponents: Record<User, User> = {};
    connectionManager: GameConnectionManager = new GameConnectionManager();
    provinces: Record<LocationId, Province> = {};
    borders: Record<LocationId, PlayerInfluence> = {};

    get ready() {
        const enoughPlayers =
            Object.keys(this.connectionManager.connections).length >= 2;

        return enoughPlayers && this.connectionManager.allConnectionsOnline;
    }

    get state(): Record<LocationId, Token> {
        const provinceState = Object.entries(this.provinces).reduce(
            (acc, [provinceId, province]) => {
                if (province.closed) {
                    acc[provinceId] = {
                        side: province.closedBy,
                        id: "control",
                    };
                } else {
                    acc[provinceId] = province.bonus;
                }

                return acc;
            },
            {}
        );

        return { ...this.borders, ...provinceState };
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

    start() {
        this.inProgress = true;
        this.initProvinces();

        const users = this.connectionManager.users;
        this.opponents[users[0]] = users[1];
        this.opponents[users[1]] = users[0];

        this.players[users[0]] = new Player(Side.CAESAR);
        this.players[users[1]] = new Player(Side.POMPEY);

        this.players[users[0]].playersTurn = true;
    }

    getOpponentPlayer(user) {
        return this.players[this.opponents[user]];
    }

    endUserTurn(
        user: User,
        { token, location }: { token: PlayerInfluence; location: LocationId }
    ): Province | void {
        const activePlayer = this.players[user];
        activePlayer.endTurn(token.id);
        this.getOpponentPlayer(user).playersTurn = true;

        const provinces = borderProvincesDictionary[location].map(
            (borderProvince) => this.provinces[borderProvince]
        );

        provinces.forEach((province) =>
            province.tryCloseBorder(location, token)
        );

        this.borders = { ...this.borders, [location]: token };
    }
}
