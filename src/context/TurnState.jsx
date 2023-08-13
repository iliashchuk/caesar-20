import { createContext, useState } from 'react';

import caesarInfluence from '../static/caesar-influence.json';
import pompeyInfluence from '../static/pompey-influence.json';

const TurnState = createContext();

function TurnStateProvider({ children }) {
    const [establishedState, setEstablishedState] = useState({
        ['sicilia-numidia']: pompeyInfluence[12],
    });
    const [activeState, setActiveState] = useState({});
    const [hand, setHand] = useState([caesarInfluence[0], caesarInfluence[6]]);

    function updateActiveState(location, token) {
        setHand(hand.filter(({ id }) => id !== token.id));
        setActiveState({ [location]: token });
    }

    return (
        <TurnState.Provider
            value={{
                hand,
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
