import {
    borderProvincesDictionary,
    provinceBordersDictionary,
} from "../static/provinces.js";
import {
    Bonus,
    BonusToken,
    ControlToken,
    LocationId,
    PlayerInfluence,
    Side,
} from "../types.js";
import { makeBonusToken } from "../utils.js";

export class Province {
    id: LocationId;
    borders: LocationId[];
    closedBorders: LocationId[] = [];
    closed: boolean = false;
    bonus: Bonus;
    token: BonusToken | ControlToken;
    controlledBy: Side;
    closedBy: Side;
    power: Record<Side, number> = { [Side.CAESAR]: 0, [Side.POMPEY]: 0 };

    constructor(locationId: LocationId, bonus: Bonus) {
        this.id = locationId;
        this.borders = provinceBordersDictionary[locationId] || [];
        this.bonus = bonus;
        this.token = makeBonusToken(bonus);
    }

    private assignControlledBy() {
        if (this.power.caesar - this.power.pompey > 0) {
            this.controlledBy = Side.CAESAR;
        } else if (this.power.caesar - this.power.pompey < 0) {
            this.controlledBy = Side.POMPEY;
        }
    }

    get potentiallyClosedNeighbors(): LocationId[] {
        return this.closedBorders.reduce<LocationId[]>((acc, border) => {
            return [
                ...acc,
                ...borderProvincesDictionary[border].filter(
                    (province) => province !== this.id
                ),
            ];
        }, []);
    }

    tryCloseBorder(border: LocationId, token: PlayerInfluence) {
        if (this.borders.includes(border)) {
            const isProvinceTop = border.split("-")[0] === this.id;
            const useTopPower = isProvinceTop ? !token.turned : token.turned;
            this.power[token.side] +=
                token.power[useTopPower ? "top" : "bottom"];
            this.closedBorders.push(border);

            if (this.borders.length === this.closedBorders.length) {
                this.closed = true;
                this.closedBy = token.side;
                this.assignControlledBy();
            }

            return true;
        }

        return false;
    }
}
