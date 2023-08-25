import { createContext, useContext, useEffect, useState } from 'react';

import { GameContext } from './GameContext';

const Tokens = createContext();

function TokensProvider({ children }) {
    const { socket, initialPlayer, initialOpponent } = useContext(GameContext);
    const [tokensRemaining, setTokensRemaining] = useState(
        initialPlayer.tokensRemaining ?? 0,
    );
    const [playerTokens, setPlayerTokens] = useState(initialPlayer.hand);
    const [opponentTokensRemaining, setOpponentTokensRemaining] = useState(
        initialOpponent.tokensRemaining ?? 0,
    );
    const [opponentTokenNumber, setOpponentTokenNumber] = useState(
        initialOpponent.tokensInHand ?? 0,
    );

    useEffect(() => {
        socket.on('player', ({ hand, tokensRemaining }) => {
            setPlayerTokens(hand);
            setTokensRemaining(tokensRemaining);
        });
    }, [socket]);

    useEffect(() => {
        socket.on('opponent', ({ tokensInHand, tokensRemaining }) => {
            setOpponentTokenNumber(tokensInHand);
            setOpponentTokensRemaining(tokensRemaining);
        });
    }, [socket]);

    return (
        <Tokens.Provider
            value={{
                playerTokens,
                tokensRemaining,
                opponentTokenNumber,
                opponentTokensRemaining,
            }}
        >
            {children}
        </Tokens.Provider>
    );
}

export { Tokens, TokensProvider };
