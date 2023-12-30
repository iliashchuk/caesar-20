import { createContext, useContext, useState } from 'react';

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
    const [activeMovement, setActiveMovement] = useState();
    const { updateAnimatedState } = useContext(TurnState);

    function finishMovement() {
        setActiveMovement();
    }

    function moveOpponentToken(token, destination) {
        function onFinish() {
            updateAnimatedState({
                [destination.id]: token,
            });
            finishMovement();
        }

        setActiveMovement({
            token,
            origin: 'opponent',
            destination,
            onFinish,
        });
    }

    function moveBonusToken(token, location, player = true) {
        function onFinish() {
            updateAnimatedState({ [location.id]: undefined });
            finishMovement();
        }

        setActiveMovement({
            token,
            origin: location,
            destination: player
                ? playerMovingTokenLocation
                : opponentMovingTokenLocation,
            onFinish,
        });
    }

    function moveControlToken(side, destination) {
        const controlToken = { id: 'control', side };

        function onFinish() {
            updateAnimatedState({
                [destination.id]: controlToken,
            });
            finishMovement();
        }

        setActiveMovement({
            token: controlToken,
            origin: 'control',
            destination,
            onFinish,
        });
    }

    function movePlayerToken(token, origin, destination) {
        setActiveMovement({
            token,
            origin,
            destination,
        });
    }

    return (
        <TokenMovement.Provider
            value={{
                activeMovement,
                moveControlToken,
                moveOpponentToken,
                moveBonusToken,
                finishMovement,
                movePlayerToken,
                opponentMovingTokenLocation,
            }}
        >
            {children}
        </TokenMovement.Provider>
    );
}

export { TokenMovement, TokenMovementProvider };
