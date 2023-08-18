import { createContext, useContext, useEffect, useState } from 'react';

import { GameContext } from './GameContext';

const TurnState = createContext();

function TurnStateProvider({ initialState, initialPlayer, children }) {
    const [tokensRemaining, setTokensRemaining] = useState(
        initialPlayer.tokensRemaining,
    );
    const [playerHand, setPlayerHand] = useState(
        initialPlayer.hand.map((token) => ({ ...token, inHand: true })),
    );
    const [establishedState, setEstablishedState] = useState(initialState);
    const [activeState, setActiveState] = useState({});
    const [playersTurn, setPlayersTurn] = useState(initialPlayer.playersTurn);

    const { socket } = useContext(GameContext);

    useEffect(() => {
        socket.on('established', (state) => setEstablishedState(state));

        socket.on('player', ({ hand, tokensRemaining, playersTurn }) => {
            setPlayerHand(hand.map((token) => ({ ...token, inHand: true })));
            setTokensRemaining(tokensRemaining);
            setPlayersTurn(playersTurn);
        });
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
        socket.emit('end-turn', activeState);
        setActiveState({});
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
