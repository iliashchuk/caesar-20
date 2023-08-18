import { useContext } from 'react';

import { TurnState } from '../../context';
import locations from '../../static/locations.json';
import { Token } from '../Token';
import { Location } from './Location';

export function EstablishedLocations() {
    const { establishedState } = useContext(TurnState);

    function renderTokenByLocationId(locationId) {
        const location = locations[locationId];
        const token = establishedState[locationId];
        const tokenRotation =
            (token?.turned ? location.angle + 180 : location.angle) + 'deg';

        return (
            <Location
                token={establishedState[locationId]}
                key={locationId}
                location={location}
            >
                <Token rotation={tokenRotation} {...token} />
            </Location>
        );
    }

    return <>{Object.keys(establishedState).map(renderTokenByLocationId)}</>;
}
