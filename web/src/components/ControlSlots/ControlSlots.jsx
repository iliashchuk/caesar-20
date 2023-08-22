import { useContext, useEffect, useState } from 'react';

import { TokenMovement } from '../../context';
import { Location } from '../Locations';
import { MovingToken, Token } from '../Token';

export function ControlSlots({ side, slots }) {
    const { movingToken, finishMovingToken } = useContext(TokenMovement);
    const [actualSlots, setActualSlots] = useState(slots);
    const [movingTokenIndex, setMovingTokenIndex] = useState();

    useEffect(() => {
        console.log(movingToken);
        if (
            movingToken &&
            movingToken.id === 'control' &&
            movingToken.side === side
        ) {
            console.log('set animation');
            setMovingTokenIndex(actualSlots.length - 1);
        }
    }, [movingToken]);

    function finishMoving() {
        finishMovingToken();
        setActualSlots(actualSlots.slice(0, actualSlots.length - 1));
    }

    return actualSlots.map((location, index) => (
        <Location key={location.id} location={location}>
            {index === movingTokenIndex ? (
                <MovingToken
                    initialLocation={location}
                    finishMoving={finishMoving}
                    token={{ side, id: 'control' }}
                />
            ) : (
                <Token token={{ side, id: 'control' }} make3d={false} />
            )}
        </Location>
    ));
}
