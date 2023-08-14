import { createContext, useState } from 'react';

import caesarInfluence from '../static/caesar-influence.json';
import pompeyInfluence from '../static/pompey-influence.json';

const TurnState = createContext();

function TurnStateProvider({ children }) {
    const [establishedState, setEstablishedState] = useState({
        ['sicilia-numidia']: pompeyInfluence[12],
    });
    const [activeState, setActiveState] = useState({});
    const [payerTokens, setPlayerTokens] = useState(
        [caesarInfluence[0], caesarInfluence[6]].map((token) => ({
            ...token,
            inHand: true,
        })),
    );

    function updateActiveState(location, token, node) {
        setPlayerTokens(
            payerTokens.map((playerToken) => {
                if (playerToken.id === token.id) {
                    return { ...playerToken, inHand: false };
                }

                return { ...playerToken, inHand: true };
            }),
        );
        setActiveState({ [location]: { ...token, node } });
    }

    return (
        <TurnState.Provider
            value={{
                payerTokens,
                establishedState,
                activeState,
                updateActiveState,
            }}
        >
            {children}
        </TurnState.Provider>
    );
}

export { TurnStateProvider, TurnState };
