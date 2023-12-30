import { useContext, useEffect, useState } from 'react';

import locations from '../static/locations.json';
import { GameContext } from './GameContext';
import { TokenMovement } from './TokenMovement';

function useStateChangesListener() {
    const { socket, side: playerSide } = useContext(GameContext);
    const {
        moveOpponentToken,
        moveBonusToken,
        moveControlToken,
        activeMovement,
    } = useContext(TokenMovement);
    const [pendingStateChanges, setPendingStateChanges] = useState([]);

    useEffect(() => {
        socket.on('state-changes', (stateChanges) => {
            setPendingStateChanges([...pendingStateChanges, ...stateChanges]);
        });
    }, [socket]);

    useEffect(() => {
        if (pendingStateChanges.length && !activeMovement) {
            const { type, location, token, side } = pendingStateChanges[0];

            if (type === 'opponent') {
                moveOpponentToken(token, locations[location]);
            }

            if (type === 'bonus') {
                moveBonusToken(token, locations[location], side === playerSide);
            }

            if (type === 'control') {
                moveControlToken(side, locations[location]);
            }

            setPendingStateChanges(pendingStateChanges.slice(1));
        }

        if (!pendingStateChanges.length && !activeMovement) {
            console.log('No pending animation changes!');
            socket.emit('state-change-animated');
        }
    }, [socket, pendingStateChanges, activeMovement, playerSide]);

    return null;
}

export { useStateChangesListener };
