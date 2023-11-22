import {
    LocationId,
    PlayerInfluence,
    Side,
    StateChange,
    StateChangeType,
    Token,
    User,
} from '../types.js';
import { makeBonusToken, makeControlToken } from '../utils.js';
import { GameConnectionManager } from './GameConnectionManager.js';
import { Map } from './Map.js';
import { Player } from './Player.js';
import { Province } from './Province.js';

export class Game {
    inProgress: boolean = false;
    players: Record<User, Player> = {};
    playersBySide: Record<Side, Player>;
    opponents: Record<User, User> = {};
    connectionManager: GameConnectionManager = new GameConnectionManager();
    map: Map;

    get ready() {
        const enoughPlayers =
            Object.keys(this.connectionManager.connections).length >= 2;

        return enoughPlayers && this.connectionManager.allConnectionsOnline;
    }

    get state(): Record<LocationId, Token> {
        const provinceState = Object.entries(this.map.provinces).reduce(
            (acc, [provinceId, province]) => {
                if (!province.closed) {
                    acc[provinceId] = makeBonusToken(province.bonus);
                } else if (province.controlledBy) {
                    acc[provinceId] = makeControlToken(province.controlledBy);
                }

                return acc;
            },
            {},
        );

        return { ...this.map.borders, ...provinceState };
    }

    get stateChanges(): StateChange[] {
        const changesWithBonusesFirst = this.map.unsortedStateChanges.sort(
            (changeA, changeB) => {
                if (changeB.type === StateChangeType.CONTROL) {
                    if (changeA.type === StateChangeType.BONUS) {
                        return -1;
                    }

                    //provinces first, then borders
                    if (
                        changeA.type === changeB.type &&
                        !changeA.location.includes('-') &&
                        changeB.location.includes('-')
                    ) {
                        return -1;
                    }
                }
            },
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
        this.map = new Map();
        this.initPlayers();
    }

    getOpponentPlayer(user) {
        return this.players[this.opponents[user]];
    }

    endUserTurn(
        user: User,
        { token, location }: { token: PlayerInfluence; location: LocationId },
    ): Province | void {
        this.map.unsortedStateChanges = [];
        const activePlayer = this.players[user];
        activePlayer.endTurn(token.id);
        this.getOpponentPlayer(user).playersTurn = true;
        // this.placeToken(token, location);
        this.map.placeTokenOnBorder(token, location, (side: Side) =>
            this.playersBySide[side].establishControl(),
        );
    }
}
