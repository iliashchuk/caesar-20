import { createContext, useContext, useEffect, useState } from 'react';

import locations from '../static/locations.json';
import { GameContext } from './GameContext';
import { TurnState } from './TurnState';

const TokenMovement = createContext();

function TokenMovementProvider({ children }) {
    const { socket } = useContext(GameContext);
    const { updateAnimatedState } = useContext(TurnState);
    const [activeMovement, setActiveMovement] = useState();
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
                console.log('bonus', token);
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
    }, [socket, pendingStateChanges, activeMovement]);

    function moveOpponentToken(token, destination) {
        setActiveMovement({
            origin: 'opponent',
            token,
            destination,
        });
    }
    function moveControlToken(side, destination) {
        setActiveMovement({
            origin: 'control',
            token: { id: 'control', side },
            destination,
        });
    }

    function finishMovement() {
        updateAnimatedState({
            [activeMovement.destination.id]: activeMovement.token,
        });
        setActiveMovement();
    }

    return (
        <TokenMovement.Provider
            value={{
                activeMovement,
                moveControlToken,
                moveOpponentToken,
                finishMovement,
            }}
        >
            {children}
        </TokenMovement.Provider>
    );
}

export { TokenMovement, TokenMovementProvider };
