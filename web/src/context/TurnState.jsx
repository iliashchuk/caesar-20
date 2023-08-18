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
    const [activeLocation, setActiveLocation] = useState();
    const [activeToken, setActiveToken] = useState();
    const [playersTurn, setPlayersTurn] = useState(initialPlayer.playersTurn);
    const canEndTurn = playersTurn && activeToken;

    function resetActiveState() {
        setActiveLocation();
        setActiveToken();
    }

    const { socket } = useContext(GameContext);

    useEffect(() => {
        socket.on('established', (state) => setEstablishedState(state));

        socket.on('player', ({ hand, tokensRemaining, playersTurn }) => {
            resetActiveState();
            setPlayerHand(hand.map((token) => ({ ...token, inHand: true })));
            setTokensRemaining(tokensRemaining);
            setPlayersTurn(playersTurn);
        });
    }, [socket]);

    function flipActiveToken() {
        setActiveToken({
            ...activeToken,
            flipped: !activeToken.flipped,
        });
    }

    function updateActiveState(location, token) {
        setPlayerHand(
            playerHand.map((playerToken) => {
                if (playerToken.id === token.id) {
                    return { ...playerToken, inHand: false };
                }

                return { ...playerToken, inHand: true };
            }),
        );
        setActiveToken(token);
        setActiveLocation(location);
    }

    function endTurn() {
        socket.emit('end-turn', {
            location: activeLocation,
            token: activeToken,
        });
        resetActiveState({});
    }

    return (
        <TurnState.Provider
            value={{
                endTurn,
                playersTurn,
                playerHand,
                tokensRemaining,
                establishedState,
                canEndTurn,
                activeState: { [activeLocation]: activeToken },
                updateActiveState,
                flipActiveToken,
            }}
        >
            {children}
        </TurnState.Provider>
    );
}

export { TurnStateProvider, TurnState };
