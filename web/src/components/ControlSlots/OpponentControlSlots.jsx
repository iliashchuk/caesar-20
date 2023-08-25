import { useContext } from 'react';

import { Control, GameContext } from '../../context';
import opponentSlotsLocations from '../../static/opponent-control-slots.json';
import { getOpponentSide } from '../../utils';
import { ControlSlots } from './ControlSlots';

export function OpponentControlSlots() {
    const { side } = useContext(GameContext);
    const { opponentControlNumber } = useContext(Control);

    const opponentSide = getOpponentSide(side);

    return (
        <ControlSlots
            controlNumber={opponentControlNumber}
            side={opponentSide}
            slots={opponentSlotsLocations}
        />
    );
}
