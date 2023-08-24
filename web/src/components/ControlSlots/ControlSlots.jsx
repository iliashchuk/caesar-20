import { useContext, useEffect, useState } from 'react';

import { TokenMovement } from '../../context';
import { Location } from '../Locations';
import { MovingToken, Token } from '../Token';

export function ControlSlots({ side, slots }) {
    const { activeMovement, finishMovement } = useContext(TokenMovement);
    const [actualSlots, setActualSlots] = useState(slots);
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

    function finishControlMovement() {
        finishMovement();
        setActualSlots(actualSlots.slice(0, actualSlots.length - 1));
        setMovingTokenIndex();
    }

    return actualSlots.map((location, index) => (
        <Location key={location.id} location={location}>
            {activeMovement && index === movingTokenIndex ? (
                <MovingToken
                    initial={location}
                    finishMovement={finishControlMovement}
                    token={{ side, id: 'control' }}
                />
            ) : (
                <Token token={{ side, id: 'control' }} make3d={false} />
            )}
        </Location>
    ));
}
