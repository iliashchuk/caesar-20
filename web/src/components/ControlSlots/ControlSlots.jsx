import { Location } from '../Locations';
import { Token } from '../Token';

export function ControlSlots({ side, locations }) {
    return locations.map((location) => (
        <Location key={location.id} location={location}>
            <Token id="control" side={side} make3d={false} />
        </Location>
    ));
}
