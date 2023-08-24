import { TokenMovementProvider } from '../../context';
import { OpponentControlSlots, PlayerControlSlots } from '../ControlSlots';
import { AvailableLocations, EstablishedLocations } from '../Locations';
import { TokenDragContext } from '../TokenDragContext/TokenDragContext';
import { OpponentUI, PlayerUI } from '../UI';

export function TurnManager() {
    return (
        <TokenDragContext>
            <TokenMovementProvider>
                <OpponentUI />
                <PlayerUI />
                <EstablishedLocations />
                <AvailableLocations />
                <PlayerControlSlots />
                <OpponentControlSlots />
            </TokenMovementProvider>
        </TokenDragContext>
    );
}
