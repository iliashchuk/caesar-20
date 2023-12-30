import { AnimatePresence } from 'framer-motion';
import { useContext } from 'react';

import { SizingContext, TokenMovement } from '../../context';
import { AnimatedToken } from '../Token';
import { OpponentHand } from './Hand';
import { TokenCounter } from './TokenCounter';
import styles from './UI.module.scss';

export function OpponentUI() {
    const { locationSize } = useContext(SizingContext);
    const { activeMovement, opponentMovingTokenLocation } =
        useContext(TokenMovement);

    const isOpponentTokenMoving =
        activeMovement && activeMovement.origin === 'opponent';

    return (
        <>
            <div
                className={styles.ui}
                style={{
                    height: locationSize + 24,
                    // top: -(locationSize + 24) / 2,
                    top: 0,
                }}
            >
                <TokenCounter opponent />
                <OpponentHand isOpponentTokenMoving={isOpponentTokenMoving} />
            </div>
            <AnimatePresence>
                {isOpponentTokenMoving && (
                    <AnimatedToken
                        {...activeMovement}
                        origin={opponentMovingTokenLocation}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
