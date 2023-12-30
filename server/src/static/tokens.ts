import { Influence, InfluenceType } from '../types.js';

export const genericInfluenceTokens: Influence[] = [
    {
        id: 'ship-0-6',
        type: InfluenceType.SHIP,
        power: {
            top: 0,
            bottom: 6,
        },
    },
    {
        id: 'ship-1-5',
        type: InfluenceType.SHIP,
        power: {
            top: 1,
            bottom: 5,
        },
    },
    {
        id: 'ship-2-4',
        type: InfluenceType.SHIP,
        power: {
            top: 2,
            bottom: 4,
        },
    },
    {
        id: 'ship-3-3',
        type: InfluenceType.SHIP,
        power: {
            top: 3,
            bottom: 3,
        },
    },
    {
        id: 'sword-0-6',
        type: InfluenceType.SWORD,
        power: {
            top: 0,
            bottom: 6,
        },
    },
    {
        id: 'sword-1-5',
        type: InfluenceType.SWORD,
        power: {
            top: 1,
            bottom: 5,
        },
    },
    {
        id: 'sword-2-4',
        type: InfluenceType.SWORD,
        power: {
            top: 2,
            bottom: 4,
        },
    },
    {
        id: 'sword-3-3',
        type: InfluenceType.SWORD,
        power: {
            top: 3,
            bottom: 3,
        },
    },
    {
        id: 'shield-0-6',
        type: InfluenceType.SHIELD,
        power: {
            top: 0,
            bottom: 6,
        },
    },
    {
        id: 'shield-1-5',
        type: InfluenceType.SHIELD,
        power: {
            top: 1,
            bottom: 5,
        },
    },
    {
        id: 'shield-2-4',
        type: InfluenceType.SHIELD,
        power: {
            top: 2,
            bottom: 4,
        },
    },
    {
        id: 'shield-3-3',
        type: InfluenceType.SHIELD,
        power: {
            top: 3,
            bottom: 3,
        },
    },
    {
        id: 'wild-1-3',
        type: InfluenceType.WILD,
        power: {
            top: 1,
            bottom: 3,
        },
    },
    {
        id: 'wild-0-4',
        type: InfluenceType.WILD,
        power: {
            top: 0,
            bottom: 4,
        },
    },
    {
        id: 'wild-2-2-a',
        type: InfluenceType.WILD,
        power: {
            top: 2,
            bottom: 2,
        },
    },
    {
        id: 'wild-2-2-b',
        type: InfluenceType.WILD,
        power: {
            top: 2,
            bottom: 2,
        },
    },
];

export const bonusTokens = [
    { side: 'bonus', id: 'senate' },
    { side: 'bonus', id: 'strength' },
    { side: 'bonus', id: 'wealth' },
    { side: 'bonus', id: 'tactics' },
];
