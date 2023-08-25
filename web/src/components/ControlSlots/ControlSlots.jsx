import { AnimatePresence } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';

import { TokenMovement } from '../../context';
import { Location } from '../Locations';
import { MovingToken, Token } from '../Token';

const WinningControlNumber = 12;

export function ControlSlots({ side, slots, controlNumber }) {
    const { activeMovement, finishMovement } = useContext(TokenMovement);
    const [actualSlots, setActualSlots] = useState(
        slots.slice(0, WinningControlNumber - controlNumber),
    );
    const [movingTokenIndex, setMovingTokenIndex] = useState();

    useEffect(() => {
        if (
            activeMovement &&
            activeMovement.origin === 'control' &&
            activeMovement.token.side === side
        ) {
            setMovingTokenIndex(actualSlots.length - 1);
        }
    }, [activeMovement]);

    useEffect(() => {
        if (!activeMovement) {
            setActualSlots(
                slots.slice(0, WinningControlNumber - controlNumber),
            );
        }
    }, [slots, controlNumber, activeMovement]);

    function finishControlMovement() {
        finishMovement();
        setActualSlots(actualSlots.slice(0, actualSlots.length - 1));
        setMovingTokenIndex();
    }

    return (
        <AnimatePresence>
            {actualSlots.map((location, index) =>
                activeMovement && index === movingTokenIndex ? (
                    <MovingToken
                        key={location.id}
                        initial={location}
                        finishMovement={finishControlMovement}
                    />
                ) : (
                    <Location key={location.id} location={location}>
                        <Token token={{ side, id: 'control' }} make3d={false} />
                    </Location>
                ),
            )}
        </AnimatePresence>
    );
}
