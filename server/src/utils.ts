import { provincesBarringItalia } from "./static/provinces.js";
import { Bonus, BonusToken, LocationId, User } from "./types.js";

export function shortenId(id: string): User {
    return id.slice(0, 8);
}

export function logEmit(msg) {
    console.info("EMITTING: ", msg);
}

export function shuffle<T>(array: T[]): T[] {
    let m = array.length,
        t: T,
        i: number;

    while (m) {
        i = Math.floor(Math.random() * m--);

        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

export function getRandomBonusesForProvinces(): Record<LocationId, BonusToken> {
    const shuffledProvinces = shuffle([...provincesBarringItalia]);
    const bonusesForProvincesBarringItalia = shuffledProvinces.reduce<
        Record<LocationId, BonusToken>
    >((acc, province, index) => {
        let bonus;
        switch (true) {
            case index < 4:
                bonus = Bonus.STRENGTH;
                break;
            case index < 8:
                bonus = Bonus.TACTICS;
                break;
            case index < 12:
                bonus = Bonus.WEALTH;
                break;
            default:
                bonus = Bonus.SENATE;
        }

        return { ...acc, [province]: { side: "bonus", id: bonus } };
    }, {});

    bonusesForProvincesBarringItalia["italia"] = {
        side: "bonus",
        id: Bonus.SENATE,
    };

    return bonusesForProvincesBarringItalia;
}
