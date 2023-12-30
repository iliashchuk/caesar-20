import {
    Bonus,
    LocationId,
    PlayerInfluence,
    Side,
    Token,
    User,
} from '../types.js';
import { makeBonusToken, makeControlToken } from '../utils.js';
import { GameConnectionManager } from './GameConnectionManager.js';
import { Map } from './Map.js';
import { Player } from './Player.js';
import { Province } from './Province.js';
import { StateChangeManager } from './StateChangeManager.js';

export class Game {
    inProgress: boolean = false;
    players: Record<User, Player> = {};
    playersBySide: Record<Side, Player>;
    opponents: Record<User, User> = {};
    connectionManager: GameConnectionManager = new GameConnectionManager();
    stateChangeManager: StateChangeManager = new StateChangeManager();
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

    get stateChanges() {
        return this.stateChangeManager.stateChanges;
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

        const caesar = new Player(Side.CAESAR, this.stateChangeManager);
        const pompey = new Player(Side.POMPEY, this.stateChangeManager);
        this.players[users[0]] = caesar;
        this.players[users[1]] = pompey;

        this.playersBySide = { [Side.CAESAR]: caesar, [Side.POMPEY]: pompey };

        this.players[users[0]].playersTurn = true;
    }

    start() {
        this.inProgress = true;
        this.map = new Map(this.stateChangeManager);
        this.initPlayers();
    }

    getOpponentPlayer(user) {
        return this.players[this.opponents[user]];
    }

    endUserTurn(
        user: User,
        { token, location }: { token: PlayerInfluence; location: LocationId },
    ): Province | void {
        this.stateChangeManager.resetChanges();
        const activePlayer = this.players[user];

        let tacticsPlayed = false;

        const establishControlBySide = (side: Side) => {
            this.playersBySide[side].establishControl();
        };

        // start bonus logic

        function activateWealth() {
            activePlayer.drawToHand();
        }

        function activateSenate() {
            activePlayer.establishSenateControl();
        }

        function activateStrength() {}

        function activateTactics() {
            tacticsPlayed = true;
        }

        function activateBonus(bonus: Bonus) {
            switch (bonus) {
                case Bonus.WEALTH:
                    activateWealth();
                    break;
                case Bonus.SENATE:
                    activateSenate();
                    break;
                case Bonus.STRENGTH:
                    activateStrength();
                    break;
                case Bonus.TACTICS:
                    activateTactics();
                    break;
            }
        }

        // end bonus logic

        this.map.placeTokenOnBorder(
            token,
            location,
            establishControlBySide,
            activateBonus,
        );

        activePlayer.endTurn(token.id);

        if (tacticsPlayed) {
            activePlayer.playersTurn = true;
            tacticsPlayed = false;
        } else {
            this.getOpponentPlayer(user).playersTurn = true;
        }
    }
}
