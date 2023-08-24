import { useContext } from 'react';
import classnames from 'classnames';

import { ActiveState } from '../../context';
import { PlayerToken } from '../Token';
import styles from './Hand.module.scss';

export function Hand() {
    const { tokensInHand } = useContext(ActiveState);

    return (
        <div className={classnames(styles.hand, styles.player)}>
            {tokensInHand.map((token) => (
                <PlayerToken key={token.id} token={token} />
            ))}
        </div>
    );
}
