import { PROVINCES, borderProvincesDictionary } from '../static/provinces.js';
import {
    Bonus,
    ControlToken,
    LocationId,
    PlayerInfluence,
    Side,
    StateChange,
    StateChangeType,
} from '../types.js';
import {
    getRandomBonusesForProvinces,
    makeBonusToken,
    makeControlToken,
} from '../utils.js';
import { Province } from './Province.js';
import { StateChangeManager } from './StateChangeManager.js';

export class Map {
    provinces: Record<LocationId, Province> = {};
    borders: Record<LocationId, PlayerInfluence | ControlToken> = {};
    stateChangeManager: StateChangeManager;

    constructor(stateChangeManager: StateChangeManager) {
        const bonusByProvince = getRandomBonusesForProvinces();
        this.stateChangeManager = stateChangeManager;

        for (let province of PROVINCES) {
            this.provinces[province] = new Province(
                province,
                bonusByProvince[province],
            );
        }
    }

    placeTokenOnBorder(
        token: PlayerInfluence,
        borderId: LocationId,
        establishControlBySide: (player: Side) => void,
        activateBonus: (bonus: Bonus) => void,
    ) {
        const provinces = borderProvincesDictionary[borderId].map(
            (borderProvince) => this.provinces[borderProvince],
        );

        this.borders = { ...this.borders, [borderId]: token };

        provinces.forEach((province) => {
            province.tryCloseBorder(borderId, token);

            if (province.closed) {
                this.stateChangeManager.getBonus(province);
                activateBonus(province.bonus);

                if (province.controlledBy) {
                    establishControlBySide(province.controlledBy);
                    this.stateChangeManager.controlProvince(province);

                    let controlledBorders: LocationId[] = [];

                    province.potentiallyClosedNeighbors.forEach(
                        (neighborId) => {
                            const neighbor = this.provinces[neighborId];
                            if (
                                neighbor.controlledBy === province.controlledBy
                            ) {
                                controlledBorders.push(
                                    province.borders.find((borderId) =>
                                        neighbor.borders.includes(borderId),
                                    ),
                                );
                            }
                        },
                    );

                    if (controlledBorders.length) {
                        controlledBorders.forEach((border) => {
                            establishControlBySide(province.controlledBy);
                            this.stateChangeManager.controlBorder(
                                border,
                                province.controlledBy,
                            );
                        });

                        this.borders = {
                            ...this.borders,
                            ...Object.fromEntries(
                                controlledBorders.map((border) => [
                                    border,
                                    makeControlToken(province.controlledBy),
                                ]),
                            ),
                        };
                    }
                }
            }
        });
    }
}
