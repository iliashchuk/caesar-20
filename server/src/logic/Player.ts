import { genericInfluenceTokens } from "../static/tokens.js";
import { PlayerClientData, PlayerInfluence, Side, Token, TokenId } from "../types.js";
import { shuffle } from "../utils.js";

export class Player {
    side: Side;
    remainingTokens: PlayerInfluence[];
    hand: PlayerInfluence[] = [];
    playersTurn: boolean;
    controls: number = 0;

    constructor(side: Side) {
        this.side = side;
        this.remainingTokens = shuffle(genericInfluenceTokens).map((token) => ({
            ...token,
            side,
        }));

        this.drawToHand();
        this.drawToHand();
    }

    get controlToken(): Token {
        return {
            side: this.side,
            id: "control",
        }
    }

    playFromHand(id: TokenId) {
        this.hand = this.hand.filter((token) => token.id !== id);
    }

    drawToHand() {
        this.hand.push(this.remainingTokens.pop());
    }

    endTurn(token: TokenId) {
        this.playFromHand(token);
        this.drawToHand();
        this.playersTurn = false;
    }

    establishControl() {
        this.controls ++;
    }

    get clientData(): PlayerClientData {
        return {
            playersTurn: this.playersTurn,
            side: this.side,
            tokensRemaining: this.remainingTokens.length,
            controls: this.controls,
            hand: this.hand,
        };
    }
}
