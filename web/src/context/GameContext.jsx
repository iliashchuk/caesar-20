import { createContext, useContext, useEffect, useState } from 'react';

import { makeSocket } from '../api/socket';
import { User } from './User';

const GameContext = createContext();

function GameContextProvider({ children }) {
    const [socket, setSocket] = useState();
    const [side, setSide] = useState();
    const [initialState, setInitialState] = useState();
    const [initialPlayer, setInitialPlayer] = useState();
    const { user } = useContext(User);
    const [gameInProgress, setGameInProgress] = useState(false);

    useEffect(() => {
        let socket;
        if (user) {
            const socket = new makeSocket({ auth: { user } });
            setSocket(socket);

            socket.on('game-ready', (initialState) => {
                setGameInProgress(true);
                setInitialState(initialState);
            });

            socket.on('init-player', ({ side, ...playerState }) => {
                setSide(side);
                setInitialPlayer(playerState);
            });

            socket.on('game-paused', () => {
                console.log('Game paused');
                setGameInProgress(false);
            });
        }

        return () => socket && socket.disconnect();
    }, [user]);
    console.log('side', side);

    return (
        <GameContext.Provider
            value={{
                side,
                socket,
                gameInProgress,
                initialState,
                initialPlayer,
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export { GameContext, GameContextProvider };
