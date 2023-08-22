import { useContext } from 'react';

import { GameContext } from '../../context';
import opponentSlotsLocations from '../../static/opponent-control-slots.json';
import { getOpponentSide } from '../../utils';
import { ControlSlots } from './ControlSlots';

export function OpponentControlSlots() {
    const { side } = useContext(GameContext);

    const opponentSide = getOpponentSide(side);

    return (
        <ControlSlots
            opponent
            side={opponentSide}
            slots={opponentSlotsLocations}
        />
    );
}
