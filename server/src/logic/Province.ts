import { provinceBordersDictionary } from "../static/provinces.js";
import { BonusToken, LocationId, Side } from "../types.js";

export class Province {
    id: LocationId;
    borders: LocationId[];
    closedBorders: LocationId[] = [];
    closed: boolean = false;
    bonus: BonusToken;
    closedBy: Side;

    constructor(locationId: LocationId, bonus: BonusToken) {
        this.id = locationId;
        this.borders = provinceBordersDictionary[locationId] || [];
        this.bonus = bonus;
    }

    tryCloseBorder(border: LocationId, side: Side) {
        if (this.borders.includes(border)) {
            this.closedBorders.push(border);

            if (this.borders.length === this.closedBorders.length) {
                this.closed = true;
                this.closedBy = side;
            }

            return true;
        }

        return false;
    }
}
