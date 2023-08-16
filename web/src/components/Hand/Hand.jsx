import { useContext } from 'react';

import { TurnState } from '../../context';
import { PortalReadyPlayerToken } from '../Token';
import styles from './Hand.module.scss';

export function Hand() {
    const { payerTokens } = useContext(TurnState);

    return (
        <div className={styles.hand}>
            {payerTokens.map((token) => (
                <PortalReadyPlayerToken
                    key={token.id}
                    token={token}
                    inHand={token.inHand}
                />
            ))}
        </div>
    );
}
