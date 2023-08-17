import { useContext } from 'react';

import { GameContext, TurnStateProvider } from '../../context';
import { Map } from '../Map';
import { TurnManager } from '../TurnManager';
import styles from './Game.module.scss';

export function Game() {
    const { gameInProgress, initialState, initialPlayer } =
        useContext(GameContext);

    return (
        <div className={styles.container}>
            <Map blur={!gameInProgress} />
            {gameInProgress ? (
                <TurnStateProvider
                    initialState={initialState}
                    initialPlayer={initialPlayer}
                >
                    <TurnManager />
                </TurnStateProvider>
            ) : (
                <h1 className={styles.waiting}>Waiting for another player</h1>
            )}
        </div>
    );
}
