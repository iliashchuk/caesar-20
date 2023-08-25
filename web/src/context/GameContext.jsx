import { createContext, useContext, useEffect, useState } from 'react';

import { makeSocket } from '../api/socket';
import { User } from './User';

const GameContext = createContext();

function GameContextProvider({ children }) {
    const [socket, setSocket] = useState();
    const [side, setSide] = useState();
    const [opponentSide, setOpponentSide] = useState();
    const [initialState, setInitialState] = useState({});
    const [initialPlayer, setInitialPlayer] = useState({});
    const [initialOpponent, setInitialOpponent] = useState({});
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

            socket.on('init-opponent', ({ side, ...opponentState }) => {
                setOpponentSide(side);
                setInitialOpponent(opponentState);
            });

            socket.on('game-paused', () => {
                console.log('Game paused');
                setGameInProgress(false);
            });
        }

        return () => socket && socket.disconnect();
    }, [user]);

    return (
        <GameContext.Provider
            value={{
                socket,
                gameInProgress,
                side,
                opponentSide,
                initialState,
                initialPlayer,
                initialOpponent,
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export { GameContext, GameContextProvider };
