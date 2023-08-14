import { createContext, useState } from 'react';

import bonuses from '../static/bonuses.json';
import caesarInfluence from '../static/caesar-influence.json';
import pompeyInfluence from '../static/pompey-influence.json';

const TurnState = createContext();

function TurnStateProvider({ children }) {
    const [establishedState, setEstablishedState] = useState({
        ['sicilia-numidia']: pompeyInfluence[12],
        ['asia']: bonuses[2],
        ['italia']: bonuses[0],
        ['gallia']: { side: 'pompey', id: 'backside' },
        ['aegyptus']: { side: 'caesar', id: 'control' },
        ['syria']: { side: 'caesar', id: 'control' },
        ['aegyptus-syria']: { side: 'caesar', id: 'control' },
        ['hispania_citerior']: { side: 'pompey', id: 'control' },
        ['gallia-gallia_cisalpina']: pompeyInfluence[5],
        ['gallia-sardinia']: pompeyInfluence[11],
        ['gallia-hispania_citerior']: { side: 'pompey', id: 'control' },
        ['hispania_citerior-hispania_ulterior']: pompeyInfluence[10],
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
