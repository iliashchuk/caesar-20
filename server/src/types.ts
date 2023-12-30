export type LocationId = string;

export type User = string;

export type TokenId = string;

export enum Side {
    POMPEY = 'pompey',
    CAESAR = 'caesar',
}

export enum InfluenceType {
    SHIP = 'ship',
    SWORD = 'sword',
    SHIELD = 'shield',
    WILD = 'wild',
}

export enum Bonus {
    WEALTH = 'wealth',
    STRENGTH = 'strength',
    TACTICS = 'tactics',
    SENATE = 'senate',
}

export type Influence = {
    id: TokenId;
    type: InfluenceType;
    power: {
        top: number;
        bottom: number;
    };
};

export type ClientData = {
    side: Side;
    controls: number;
    tokensRemaining: number;
    playersTurn: boolean;
};

export type PlayerClientData = ClientData & {
    hand: PlayerInfluence[];
};

export type OpponentsClientData = ClientData & {
    tokensInHand: number;
};

export enum StateChangeType {
    BONUS = 'bonus',
    CONTROL = 'control',
}

export type StateChange = {
    location: LocationId;
    type: StateChangeType;
    side?: Side;
    token?: Token;
};

export type PlayerInfluence = Influence & { side: Side; turned?: boolean };

export type BonusToken = {
    id: Bonus;
    side: 'bonus';
};

export type ControlToken = {
    id: 'control';
    side: Side;
};

export type Token = PlayerInfluence | BonusToken | ControlToken;
