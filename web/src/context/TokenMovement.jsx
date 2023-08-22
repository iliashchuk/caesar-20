import { createContext, useState } from 'react';

const TokenMovement = createContext();

function TokenMovementProvider({ children }) {
    const [movingToken, setMovingToken] = useState();
    const [destination, setDestination] = useState();
    const [isMoving, setIsMoving] = useState(false);

    function moveTokenTo(token, location) {
        setMovingToken(token);
        setDestination(location);
        setIsMoving(true);
    }

    function finishMovingToken() {
        setMovingToken();
        setDestination();
        setIsMoving(false);
    }

    return (
        <TokenMovement.Provider
            value={{
                movingToken,
                destination,
                isMoving,
                moveTokenTo,
                finishMovingToken,
            }}
        >
            {children}
        </TokenMovement.Provider>
    );
}

export { TokenMovement, TokenMovementProvider };
