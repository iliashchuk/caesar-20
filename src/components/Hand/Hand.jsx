import { useContext } from 'react';

import { TurnState } from '../../context';
import { DraggableToken } from '../Token';
import styles from './Hand.module.scss';

export function Hand() {
    const { hand } = useContext(TurnState);

    return (
        <div className={styles.hand}>
            {hand.map((tokenId) => (
                <DraggableToken key={tokenId} side="caesar" id={tokenId} />
            ))}
        </div>
    );
}
