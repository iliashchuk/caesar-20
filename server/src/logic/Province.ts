import { provinceBordersDictionary } from "../static/provinces.js";
import { BonusToken, LocationId, PlayerInfluence, Side } from "../types.js";

export class Province {
    id: LocationId;
    borders: LocationId[];
    closedBorders: LocationId[] = [];
    closed: boolean = false;
    bonus: BonusToken;
    closedBy: Side;
    power: Record<Side, number> = { [Side.CAESAR]: 0, [Side.POMPEY]: 0 };

    constructor(locationId: LocationId, bonus: BonusToken) {
        this.id = locationId;
        this.borders = provinceBordersDictionary[locationId] || [];
        this.bonus = bonus;
    }

    tryCloseBorder(border: LocationId, token: PlayerInfluence) {
        if (this.borders.includes(border)) {
            const isProvinceTop = border.split('-')[0] === this.id;
            const useTopPower = (isProvinceTop ? !token.turned : token.turned)
            this.power[token.side] = token.power[useTopPower ? 'top' : 'bottom'];

            this.closedBorders.push(border);

            if (this.borders.length === this.closedBorders.length) {
                this.closed = true;
                this.closedBy = token.side;
            }

            return true;
        }

        return false;
    }
}
