import { createContext, useContext, useEffect, useState } from 'react';

import { GameContext } from './GameContext';

const TurnState = createContext();

function TurnStateProvider({ initialState, initialPlayer, children }) {
    const { socket } = useContext(GameContext);

    const [establishedState, setEstablishedState] = useState(initialState);
    const [activeState, setActiveState] = useState({});
    const [playersTurn, setPlayersTurn] = useState(true);
    const [tokensRemaining, setTokensRemaining] = useState(
        initialPlayer.tokensRemaining,
    );
    console.log(initialPlayer.hand);
    const [playerHand, setPlayerHand] = useState(
        initialPlayer.hand.map((token) => ({ ...token, inHand: true })),
    );

    useEffect(() => {
        socket.on('established', (state) => setEstablishedState(state));
    }, [socket]);

    function updateActiveState(location, token, node) {
        setPlayerHand(
            playerHand.map((playerToken) => {
                if (playerToken.id === token.id) {
                    return { ...playerToken, inHand: false };
                }

                return { ...playerToken, inHand: true };
            }),
        );
        setActiveState({ [location]: { ...token, node } });
    }

    function endTurn() {
        setPlayersTurn(false);
        socket.emit('end-turn', activeState);
    }

    return (
        <TurnState.Provider
            value={{
                endTurn,
                playersTurn,
                playerHand,
                tokensRemaining,
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
