import { createContext, useContext, useEffect, useState } from 'react';

import locations from '../static/locations.json';
import { GameContext } from './GameContext';

const TokenMovement = createContext();

function TokenMovementProvider({ children }) {
    const [movingToken, setMovingToken] = useState();
    const [destination, setDestination] = useState();
    const [isMoving, setIsMoving] = useState(false);
    const [pendingChanges, setPendingChanges] = useState([]);
    const [activeChange, setActiveChange] = useState();
    const { socket } = useContext(GameContext);

    useEffect(() => {
        socket.on('state-changes', (stateChanges) => {
            setPendingChanges(stateChanges);
        });
    }, [socket]);

    useEffect(() => {
        console.log(pendingChanges, activeChange);
        if (pendingChanges.length && !activeChange) {
            setActiveChange(pendingChanges[0]);
            setPendingChanges(pendingChanges.slice(1));
        }

        let timeout;
        if (activeChange) {
            if (activeChange.type === 'bonus') {
                timeout = setTimeout(() => {
                    console.log(activeChange);
                    setActiveChange();
                }, 1000);
                return;
            }

            if (activeChange.type === 'control') {
                moveTokenTo(
                    { ...activeChange },
                    locations[activeChange.location],
                );
            }
        }

        if (!pendingChanges.length && !activeChange) {
            console.log('pending cleared!', pendingChanges);
            socket.emit('state-change-animated');
        }

        return () => clearTimeout(timeout);
    }, [pendingChanges, activeChange]);

    function moveTokenTo(token, location) {
        setMovingToken(token);
        setDestination(location);
        setIsMoving(true);
    }

    function finishMovingToken() {
        setMovingToken();
        setDestination();
        setIsMoving(false);
        setActiveChange();
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
