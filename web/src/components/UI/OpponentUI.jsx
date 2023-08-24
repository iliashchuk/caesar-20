import { AnimatePresence } from 'framer-motion';
import { useContext } from 'react';

import { SizingContext, TokenMovement } from '../../context';
import { MovingToken } from '../Token';
import { OpponentHand } from './Hand';
import styles from './UI.module.scss';

export function OpponentUI() {
    const { locationSize } = useContext(SizingContext);
    const { activeMovement } = useContext(TokenMovement);

    const opponentMovingTokenLocation = {
        x: 0.5,
        y: 0,
    };

    const isOpponentTokenMoving =
        activeMovement && activeMovement.origin === 'opponent';

    return (
        <>
            <div
                className={styles.ui}
                style={{
                    height: locationSize + 24,
                    top: -(locationSize + 24) / 2,
                }}
            >
                <OpponentHand isOpponentTokenMoving={isOpponentTokenMoving} />
            </div>
            <AnimatePresence>
                {isOpponentTokenMoving && (
                    <MovingToken initial={opponentMovingTokenLocation} />
                )}
            </AnimatePresence>
        </>
    );
}
