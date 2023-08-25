import { createContext, useContext, useEffect, useState } from 'react';

import { GameContext } from './GameContext';

const TurnState = createContext();

function TurnStateProvider({ children }) {
    const { socket, initialPlayer, initialState } = useContext(GameContext);
    const [playersTurn, setPlayersTurn] = useState(initialPlayer.playersTurn);
    const [establishedState, setEstablishedState] = useState(initialState);
    const [animatedState, setAnimatedState] = useState({});

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

        socket.on('player', ({  playersTurn }) => {
            setPlayersTurn(playersTurn);
        });
    }, [socket]);

    return (
        <TurnState.Provider
            value={{
                playersTurn,
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
