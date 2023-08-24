import { createContext, useContext, useEffect, useState } from 'react';

import { GameContext } from './GameContext';

const TurnState = createContext();

function TurnStateProvider({ initialState, initialPlayer, children }) {
    const [tokensRemaining, setTokensRemaining] = useState(
        initialPlayer.tokensRemaining,
    );
    const [playerTokens, setPlayerTokens] = useState(initialPlayer.hand);
    const [opponentTokenNumber, setOpponentTokenNumber] = useState(2);
    const [establishedState, setEstablishedState] = useState(initialState);
    const [animatedState, setAnimatedState] = useState({});
    const [playersTurn, setPlayersTurn] = useState(initialPlayer.playersTurn);
    const { socket } = useContext(GameContext);

    function endTurn(location, token) {
        socket.emit('end-turn', {
            location: location.id,
            token: token,
        });
    }

    function updateAnimatedState(state) {
        setAnimatedState({ ...animatedState, ...state });
    }

    function establishState(state) {
        setAnimatedState();
        setEstablishedState(state);
    }

    useEffect(() => {
        socket.on('established', establishState);

        socket.on('player', ({ hand, tokensRemaining, playersTurn }) => {
            setPlayerTokens(hand);
            setTokensRemaining(tokensRemaining);
            setPlayersTurn(playersTurn);
        });
    }, [socket]);

    return (
        <TurnState.Provider
            value={{
                playersTurn,
                playerTokens,
                tokensRemaining,
                opponentTokenNumber,
                updateAnimatedState,
                endTurn,
                establishedLocationState: {
                    ...establishedState,
                    ...animatedState,
                },
            }}
        >
            {children}
        </TurnState.Provider>
    );
}

export { TurnStateProvider, TurnState };
