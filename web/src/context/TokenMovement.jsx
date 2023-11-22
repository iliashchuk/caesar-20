import { createContext, useContext, useEffect, useState } from 'react';

import locations from '../static/locations.json';
import { GameContext } from './GameContext';
import { TurnState } from './TurnState';

const TokenMovement = createContext();

const opponentMovingTokenLocation = {
    x: 0.5,
    y: -0.2,
};

const playerMovingTokenLocation = {
    x: 0.5,
    y: 1.2,
};

function TokenMovementProvider({ children }) {
    const { socket } = useContext(GameContext);
    const { updateAnimatedState } = useContext(TurnState);
    const { side: playerSide } = useContext(GameContext);
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

    function moveBonusToken(token, location, player = true) {
        setActiveMovement({
            origin: location,
            token,
            destination: player
                ? playerMovingTokenLocation
                : opponentMovingTokenLocation,
        });
    }

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
        setActiveMovement();
    }

    return (
        <TokenMovement.Provider
            value={{
                activeMovement,
                moveControlToken,
                moveOpponentToken,
                moveBonusToken,
                finishMovement,
                updateAnimatedState,
                opponentMovingTokenLocation,
            }}
        >
            {children}
        </TokenMovement.Provider>
    );
}

export { TokenMovement, TokenMovementProvider };
