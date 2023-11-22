import { useContext } from 'react';

import { TurnState } from '../../context';
import locations from '../../static/locations.json';
import { Token } from '../Token';
import { Location } from './Location';

export function EstablishedLocations() {
    const { establishedLocationState } = useContext(TurnState);

    function renderLocationById(locationId) {
        const location = locations[locationId];
        const token = establishedLocationState[locationId];
        const tokenRotation =
            (token?.turned ? location.angle + 180 : location.angle) + 'deg';

        return (
            <Location
                token={establishedLocationState[locationId]}
                key={locationId}
                location={location}
            >
                {token && <Token rotation={tokenRotation} token={token} />}
            </Location>
        );
    }

    return <>{Object.keys(establishedLocationState).map(renderLocationById)}</>;
}
