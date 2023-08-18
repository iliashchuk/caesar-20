import { useContext } from 'react';

import { ActiveState } from '../../context';
import { PlayerToken } from '../Token';
import styles from './Hand.module.scss';

export function Hand() {
    const { tokensInHand } = useContext(ActiveState);

    return (
        <div className={styles.hand}>
            {tokensInHand.map((token) => (
                <PlayerToken key={token.id} token={token} />
            ))}
        </div>
    );
}
