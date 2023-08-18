import { useContext } from 'react';

import { ActiveState, TurnState } from '../../context';
import { PortalReadyPlayerToken } from '../Token';
import styles from './Hand.module.scss';

export function Hand() {
    const { playerTokens } = useContext(TurnState);
    const { tokensInHand } = useContext(ActiveState);

    return (
        <div className={styles.hand}>
            {playerTokens.map((token) => (
                <PortalReadyPlayerToken
                    key={token.id}
                    token={token}
                    inHand={tokensInHand.find(({ id }) => id === token.id)}
                />
            ))}
        </div>
    );
}
