import { useContext } from 'react';

import { TurnState } from '../../context';
import locations from '../../static/locations.json';
import { Location } from './Location';

export function EstablishedLocations() {
    const { establishedState } = useContext(TurnState);

    return (
        <>
            {Object.keys(establishedState).map((locationId) => (
                <Location key={locationId} location={locations[locationId]} />
            ))}
        </>
    );
}
