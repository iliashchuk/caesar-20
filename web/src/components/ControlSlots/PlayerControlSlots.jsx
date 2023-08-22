import { useContext } from 'react';

import { GameContext } from '../../context';
import playerSlotsLocations from '../../static/player-control-slots.json';
import { ControlSlots } from './ControlSlots';

export function PlayerControlSlots() {
    const { side } = useContext(GameContext);

    return (
        <ControlSlots
            opponent={false}
            side={side}
            slots={playerSlotsLocations}
        />
    );
}
