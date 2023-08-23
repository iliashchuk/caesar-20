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
    const [playersTurn, setPlayersTurn] = useState(initialPlayer.playersTurn);
    const { socket } = useContext(GameContext);

    useEffect(() => {
        socket.on('established', (state) => setEstablishedState(state));

        socket.on('player', ({ hand, tokensRemaining, playersTurn }) => {
            setPlayerTokens(hand);
            setTokensRemaining(tokensRemaining);
            setPlayersTurn(playersTurn);
        });
    }, [socket]);

    function endTurn(location, token) {
        socket.emit('end-turn', {
            location: location.id,
            token: token,
        });
    }

    return (
        <TurnState.Provider
            value={{
                endTurn,
                playersTurn,
                playerTokens,
                tokensRemaining,
                establishedState,
                opponentTokenNumber,
            }}
        >
            {children}
        </TurnState.Provider>
    );
}

export { TurnStateProvider, TurnState };
