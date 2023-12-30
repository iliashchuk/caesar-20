import { useStateChangesListener } from '@context';

import { OpponentControlSlots, PlayerControlSlots } from '../ControlSlots';
import { AvailableLocations, EstablishedLocations } from '../Locations';
import { TokenDragContext } from './TokenDragContext';
import { OpponentUI, PlayerUI } from '../UI';

export function TokenManager() {
    useStateChangesListener();

    return (
        <TokenDragContext>
            <OpponentUI />
            <PlayerUI />
            <EstablishedLocations />
            <AvailableLocations />
            <PlayerControlSlots />
            <OpponentControlSlots />
        </TokenDragContext>
    );
}
