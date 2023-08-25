import { useContext } from 'react';

import { GameContext, Tokens } from '../../../context';
import { Token } from '../../Token';
import styles from './TokenCounter.module.scss';

export function TokenCounter({ opponent = false }) {
    const { tokensRemaining, opponentTokensRemaining } = useContext(Tokens);
    const { side, opponentSide } = useContext(GameContext);

    return (
        <div className={styles.container}>
            <Token
                make3d={false}
                token={{ side: opponent ? opponentSide : side, id: 'backside' }}
            />
            <div className={styles.counterOverlay}>
                {opponent ? opponentTokensRemaining : tokensRemaining}
            </div>
        </div>
    );
}
