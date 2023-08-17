import { createContext, useContext, useEffect, useState } from 'react';

import caesarInfluence from '../static/caesar-influence.json';
import { GameContext } from './GameContext';

const TurnState = createContext();

function TurnStateProvider({ initialState, children }) {
    const { socket } = useContext(GameContext);

    const [establishedState, setEstablishedState] = useState(initialState);
    const [activeState, setActiveState] = useState({});
    const [playersTurn, setPlayersTurn] = useState(true);
    const [tokensRemaining, setTokensRemaining] = useState(19);
    const [payerTokens, setPlayerTokens] = useState(
        [caesarInfluence[0], caesarInfluence[6]].map((token) => ({
            ...token,
            inHand: true,
        })),
    );

    useEffect(() => {
        socket.on('established', (state) => setEstablishedState(state));
    }, [socket]);

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

    function endTurn() {
        setPlayersTurn(false);
        socket.emit('end-turn', activeState);
    }

    return (
        <TurnState.Provider
            value={{
                endTurn,
                playersTurn,
                payerTokens,
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
