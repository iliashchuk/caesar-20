import { Player } from "./Player.js";
import { PlayerInfluence, Side } from "./types.js";
import { getRandomBonusesForProvinces } from "./utils.js";

export class Game {
    constructor() {
        this.state = getRandomBonusesForProvinces();
    }

    state: Record<string, any>;
    players: Record<string, Player> = {};
    playersConnected: Record<string, boolean> = {};

    verifyOrAddPlayer = (user: string) => {
        const numberOfPlayers = Object.keys(this.players).length;
        this.playersConnected[user] = true;

        if (this.players[user]) {
            return true;
        }

        if (numberOfPlayers === 0) {
            this.players[user] = new Player(Side.CAESAR);
            return true;
        }

        this.players[user] = new Player(Side.POMPEY);
    };

    disconnectPlayer = (user: string) => {
        this.playersConnected[user] = false;
    };

    get ready() {
        const enoughPlayers = Object.keys(this.players).length >= 2;
        const playersConnected = !Object.values(this.playersConnected).includes(
            false
        );

        return enoughPlayers && playersConnected;
    }
}
