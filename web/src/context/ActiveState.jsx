import { createContext, useContext, useEffect, useState } from 'react';

import { Tokens } from './Tokens';
import { TurnState } from './TurnState';

export const ActiveState = createContext();

export function ActiveStateProvider({ children }) {
    const { endTurn } = useContext(TurnState);
    const { playerTokens } = useContext(Tokens);
    const [activeLocation, setActiveLocation] = useState();
    const [activeToken, setActiveToken] = useState();
    const [tokensInHand, setTokensInHand] = useState(playerTokens);

    function turnActiveToken() {
        setActiveToken({
            ...activeToken,
            turned: !activeToken.turned,
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
                playerTokens,
                turnActiveToken,
                updateActiveState,
            }}
        >
            {children}
        </ActiveState.Provider>
    );
}
