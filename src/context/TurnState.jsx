import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import bonuses from '../static/bonuses.json';
import caesarInfluence from '../static/caesar-influence.json';
import pompeyInfluence from '../static/pompey-influence.json';

const TurnState = createContext();

const socket = io('http://localhost:3000');

function TurnStateProvider({ children }) {
    const [establishedState, setEstablishedState] = useState([]);

    const [activeState, setActiveState] = useState({});
    const [payerTokens, setPlayerTokens] = useState(
        [caesarInfluence[0], caesarInfluence[6]].map((token) => ({
            ...token,
            inHand: true,
        })),
    );

    useEffect(() => {
        socket.on('connect', () => {
            socket.emit('ready');
        });

        socket.on('established', (state) => {
            setEstablishedState(state);
        });
    }, []);

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
        socket.emit('token', { [location]: { ...token, node } });
    }

    return (
        <TurnState.Provider
            value={{
                payerTokens,
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
