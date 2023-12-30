import { genericInfluenceTokens } from '../static/tokens.js';
import {
    OpponentsClientData,
    PlayerClientData,
    PlayerInfluence,
    Side,
    Token,
    TokenId,
} from '../types.js';
import { shuffle } from '../utils.js';
import { StateChangeManager } from './StateChangeManager.js';

export class Player {
    side: Side;
    remainingTokens: PlayerInfluence[];
    hand: PlayerInfluence[] = [];
    playersTurn: boolean;
    senate: number = 0;
    controls: number = 0;
    stateChangeManager: StateChangeManager;

    constructor(side: Side, stateChangeManager: StateChangeManager) {
        this.side = side;
        this.remainingTokens = shuffle(genericInfluenceTokens).map((token) => ({
            ...token,
            side,
        }));
        this.stateChangeManager = stateChangeManager;

        this.drawToHand();
        this.drawToHand();
    }

    get controlToken(): Token {
        return {
            side: this.side,
            id: 'control',
        };
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
        this.controls++;
    }

    establishSenateControl() {
        this.senate++;
        for (let i = 0; i < this.senate; i++) {
            this.establishControl();
            this.stateChangeManager.controlSenate(this.senate, this.side);
        }
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

    get opponentClientData(): OpponentsClientData {
        return {
            playersTurn: this.playersTurn,
            side: this.side,
            tokensRemaining: this.remainingTokens.length,
            controls: this.controls,
            tokensInHand: this.hand.length,
        };
    }
}
