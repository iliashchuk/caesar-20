import { createContext, useState } from 'react';

const TurnState = createContext();

function TurnStateProvider({ children }) {
    const [establishedState, setEstablishedState] = useState({});
    const [activeState, setActiveState] = useState({});
    const [hand, setHand] = useState(['swords-2-4']);

    function updateActiveState(location, token) {
        setHand(hand.filter((id) => id === !token.id));
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
