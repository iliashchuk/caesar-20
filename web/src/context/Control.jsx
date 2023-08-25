import { createContext, useContext, useEffect, useState } from 'react';

import { GameContext } from './GameContext';

const Control = createContext();

function ControlProvider({ children }) {
    const { socket, initialPlayer } = useContext(GameContext);
    const [controlNumber, setControlNumber] = useState(initialPlayer.controls);
    const [opponentControlNumber, setOpponentControlNumber] = useState({});

    useEffect(() => {
        socket.on('player', ({ controls }) => {
            setControlNumber(controls);
        });

        socket.on('opponent', ({ controls }) => {
            setOpponentControlNumber(controls);
        });
    }, [socket]);

    return (
        <Control.Provider value={{ controlNumber, opponentControlNumber }}>
            {children}
        </Control.Provider>
    );
}

export { Control, ControlProvider };
