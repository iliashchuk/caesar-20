import { useContext } from 'react';

import { TurnState } from '../../context';
import locations from '../../static/locations.json';
import { DroppableLocation } from './DroppableLocation';

export function AvailableLocations() {
    const { establishedLocationState } = useContext(TurnState);

    const availableLocations = Object.values(locations).filter((location) => {
        if (!location.id) {
            return;
        }

        if (Object.keys(establishedLocationState).includes(location.id)) {
            return false;
        }

        if (location.type === 'bonus') {
            return false;
        }

        return true;
    });

    return (
        <>
            {availableLocations.map((location) => {
                return (
                    <DroppableLocation key={location.id} location={location} />
                );
            })}
        </>
    );
}
