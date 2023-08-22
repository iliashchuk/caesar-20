import { GameConnectionManager } from "./GameConnectionManager.js";
import { Player } from "./Player.js";
import { LocationName, PlayerInfluence, Side } from "../types.js";
import { getRandomBonusesForProvinces } from "../utils.js";

export class Game {
    inProgress: boolean = false;
    state: Record<string, any>;
    players: Record<string, Player> = {};
    opponents: Record<string, string> = {};
    connectionManager: GameConnectionManager = new GameConnectionManager();

    get ready() {
        const enoughPlayers =
            Object.keys(this.connectionManager.connections).length >= 2;

        return enoughPlayers && this.connectionManager.allConnectionsOnline;
    }

    addOrReconnectPlayer = (user: string, socket) => {
        if (this.connectionManager.connections[user]) {
            this.connectionManager.reconnect(user, socket);
        } else {
            this.connectionManager.addConnection(user, socket);
        }
    };

    start() {
        this.inProgress = true;
        this.state = getRandomBonusesForProvinces();

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
        user: string,
        { token, location }: { token: PlayerInfluence; location: string }
    ) {
        const activePlayer = this.players[user];

        activePlayer.playFromHand(token.id);
        activePlayer.drawToHand();
        activePlayer.playersTurn = false;

        const opponent = this.getOpponentPlayer(user);
        opponent.playersTurn = true;

        this.state = { ...this.state, [location]: token };
    }
}
