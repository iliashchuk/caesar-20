import { useContext } from 'react';

import { GameContext, TurnState } from '../../context';
import { Token } from '../Token/Token';
import styles from './TokenCounter.module.scss';

export function TokenCounter() {
    const { tokensRemaining } = useContext(TurnState);
    const { side } = useContext(GameContext);

    return (
        <div className={styles.container}>
            <Token make3d={false} side={side} id="backside" />
            <div className={styles.counterOverlay}>{tokensRemaining}</div>
        </div>
    );
}
