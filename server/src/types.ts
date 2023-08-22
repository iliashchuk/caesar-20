export type LocationId = string;

export type User = string;

export type TokenId = string;

export enum Side {
    POMPEY = "pompey",
    CAESAR = "caesar",
}

export enum InfluenceType {
    SHIP = "ship",
    SWORD = "sword",
    SHIELD = "shield",
    WILD = "wild",
}

export enum Bonus {
    WEALTH = "wealth",
    STRENGTH = "strength",
    TACTICS = "tactics",
    SENATE = "senate",
}

export type Influence = {
    id: TokenId;
    type: InfluenceType;
    power: {
        top: number;
        bottom: number;
    };
};

export type PlayerClientData = {
    side: Side;
    hand: PlayerInfluence[];
    tokensRemaining: number;
    playersTurn: boolean;
};

export type PlayerInfluence = Influence & { side: Side; turned?: boolean };

export type BonusToken = {
    id: Bonus;
    side: "bonus";
};

export type Token = PlayerInfluence | BonusToken;
