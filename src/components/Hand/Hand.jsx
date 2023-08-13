import { useContext } from 'react';

import { TurnState } from '../../context';
import { PlayerToken } from '../Token';
import styles from './Hand.module.scss';

export function Hand() {
    const { hand } = useContext(TurnState);

    return (
        <div className={styles.hand}>
            {hand.map((token) => (
                <PlayerToken key={token.id} {...token} />
            ))}
        </div>
    );
}
