import { OpponentControlSlots, PlayerControlSlots } from '../ControlSlots';
import { AvailableLocations, EstablishedLocations } from '../Locations';
import { TokenDragContext } from '../TokenDragContext';
import { OpponentUI, PlayerUI } from '../UI';
import { useStateChangesListener} from '../../context';

export function TurnManager() {
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
