import { LocationId, StateChange, StateChangeType } from '../types.js';
import { makeBonusToken } from '../utils.js';
import { Province } from './Province.js';

export class StateChangeManager {
    unsortedStateChanges: StateChange[] = [];

    get stateChanges(): StateChange[] {
        const changesWithBonusesFirst = this.unsortedStateChanges.sort(
            (changeA, changeB) => {
                if (changeB.type === StateChangeType.CONTROL) {
                    if (changeA.type === StateChangeType.BONUS) {
                        return -1;
                    }

                    //provinces first, then borders
                    if (
                        changeA.type === changeB.type &&
                        !changeA.location.includes('-') &&
                        changeB.location.includes('-')
                    ) {
                        return -1;
                    }
                }
            },
        );

        return changesWithBonusesFirst;
    }

    resetChanges() {
        this.unsortedStateChanges = [];
    }

    getBonus(province: Province) {
        this.unsortedStateChanges.push({
            type: StateChangeType.BONUS,
            token: makeBonusToken(province.bonus),
            location: province.id,
            side: province.closedBy,
        });
    }

    controlProvince(province: Province) {
        this.unsortedStateChanges.push({
            type: StateChangeType.CONTROL,
            location: province.id,
            side: province.controlledBy,
        });
    }

    controlBorder(border: LocationId, side) {
        this.unsortedStateChanges.push({
            type: StateChangeType.CONTROL,
            location: border,
            side,
        });
    }

    controlSenate(senateSlotNumber: number, side) {
        this.unsortedStateChanges.push({
            type: StateChangeType.SENATE,
            location: `senate_${senateSlotNumber}`,
            side,
        });
    }
}
