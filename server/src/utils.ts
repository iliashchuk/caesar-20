import { provincesBarringItalia } from "./static/provinces.js";

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

export function getRandomBonusesForProvinces() {
    const shuffledProvinces = shuffle(provincesBarringItalia);
    const bonusesForProvincesBarringItalia = shuffledProvinces.reduce(
        (acc, province, index) => {
            let bonus;
            switch (true) {
                case index < 4:
                    bonus = "strength";
                    break;
                case index < 8:
                    bonus = "tactics";
                    break;
                case index < 12:
                    bonus = "wealth";
                    break;
                default:
                    bonus = "senate";
            }

            return { ...acc, [province]: { side: "bonus", id: bonus } };
        },
        {}
    );

    bonusesForProvincesBarringItalia["italia"] = {
        side: "bonus",
        id: "senate",
    };

    return bonusesForProvincesBarringItalia;
}
