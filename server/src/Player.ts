import { genericInfluenceTokens } from "./static/tokens.js";
import { PlayerClientData, PlayerInfluence, Side } from "./types.js";
import { shuffle } from "./utils.js";

export class Player {
    constructor(side: Side) {
        this.side = side;
        this.remainingTokens = shuffle(genericInfluenceTokens).map((token) => ({
            ...token,
            side,
        }));

        this.drawToHand();
        this.drawToHand();
    }

    side: Side;
    remainingTokens: PlayerInfluence[];
    hand: PlayerInfluence[] = [];

    playFromHand(id: string) {
        this.hand = this.hand.filter((token) => token.id !== id);
    }

    drawToHand() {
        this.hand.push(this.remainingTokens.pop());
    }

    get clientData(): PlayerClientData {
        return {
            side: this.side,
            tokensRemaining: this.remainingTokens.length,
            hand: this.hand,
        };
    }
}
