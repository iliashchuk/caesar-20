import { useContext } from 'react';

import { Control, GameContext } from '../../context';
import playerSlotsLocations from '../../static/player-control-slots.json';
import { ControlSlots } from './ControlSlots';

export function PlayerControlSlots() {
    const { side } = useContext(GameContext);
    const { controlNumber } = useContext(Control);

    return (
        <ControlSlots
            controlNumber={controlNumber}
            side={side}
            slots={playerSlotsLocations}
        />
    );
}
