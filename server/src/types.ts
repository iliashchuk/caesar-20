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

export type Influence = {
    id: string;
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
