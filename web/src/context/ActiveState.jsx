import { createContext, useContext, useEffect, useState } from 'react';

import { TurnState } from './TurnState';

export const ActiveState = createContext();

export function ActiveStateProvider({ children }) {
    const { playerTokens, endTurn } = useContext(TurnState);
    const [activeLocation, setActiveLocation] = useState();
    const [activeToken, setActiveToken] = useState();
    const [tokensInHand, setTokensInHand] = useState(playerTokens);

    function flipActiveToken() {
        setActiveToken({
            ...activeToken,
            flipped: !activeToken.flipped,
        });
    }

    function updateActiveState(location, token) {
        const newTokensInHand = tokensInHand.filter(
            ({ id }) => id !== token.id,
        );
        if (activeToken && activeToken.id !== token.id) {
            newTokensInHand.push(activeToken);
        }
        setTokensInHand(newTokensInHand);

        setActiveLocation(location);
        setActiveToken(token);
    }

    function endTurnActivity() {
        endTurn(activeLocation, activeToken);
    }

    useEffect(() => {
        setActiveLocation();
        setActiveToken();
        setTokensInHand(playerTokens);
    }, [playerTokens]);

    return (
        <ActiveState.Provider
            value={{
                tokensInHand,
                activeLocation,
                activeToken,
                endTurnActivity,
                flipActiveToken,
                updateActiveState,
            }}
        >
            {children}
        </ActiveState.Provider>
    );
}
