import { motion } from 'framer-motion';
import { useContext } from 'react';

import { SizingContext, TokenMovement } from '../../context';
import { Token } from './Token';
import styles from './Token.module.scss';

export function MovingToken({ initial, token, finishMovement }) {
    const { getScaledPosition, getPositionOffsetByTokenRadius } =
        useContext(SizingContext);
    const { activeMovement, finishMovement: defaultFinishMovement } =
        useContext(TokenMovement);

    return (
        <motion.div
            className={styles.tokenMovement}
            initial={{
                ...getPositionOffsetByTokenRadius(getScaledPosition(initial)),
            }}
            onAnimationComplete={
                finishMovement ? finishMovement : defaultFinishMovement
            }
            animate={{
                ...getPositionOffsetByTokenRadius(
                    getScaledPosition(activeMovement.destination),
                ),
            }}
            transition={{ duration: 1.5, type: 'spring' }}
        >
            <Token token={token ? token : activeMovement.token}></Token>
        </motion.div>
    );
}
