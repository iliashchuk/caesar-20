import { useContext } from 'react';

import {
    ActiveStateProvider,
    ControlProvider,
    GameContext,
    SizingContext,
    TokenMovementProvider,
    TokensProvider,
    TurnStateProvider,
} from '../../context';
import { Map } from '../Map';
import { TurnManager } from '../TurnManager';
import styles from './Game.module.scss';

export function Game() {
    const { scale } = useContext(SizingContext);
    const { gameInProgress } = useContext(GameContext);

    return (
        <div className={styles.container}>
            <Map blur={!gameInProgress} />
            {gameInProgress && scale ? (
                <ControlProvider>
                    <TokensProvider>
                        <TurnStateProvider>
                            <ActiveStateProvider>
                                <TokenMovementProvider>
                                    <TurnManager />
                                </TokenMovementProvider>
                            </ActiveStateProvider>
                        </TurnStateProvider>
                    </TokensProvider>
                </ControlProvider>
            ) : (
                <h1 className={styles.waiting}>Waiting for another player</h1>
            )}
        </div>
    );
}
