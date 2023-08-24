import { motion } from 'framer-motion';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';

import { SizingContext, TokenMovement } from '../../context';
import { Token } from './Token';
import styles from './Token.module.scss';

export function MovingToken({ initial, token, finishMovement }) {
    const { getScaledPosition, getPositionOffsetByTokenRadius } =
        useContext(SizingContext);
    const { activeMovement, finishMovement: defaultFinishMovement } =
        useContext(TokenMovement);
    const [movement, setMovement] = useState();

    useLayoutEffect(() => {
        setMovement(activeMovement);
    }, []);

    useEffect(() => {
        return () => console.log('unmount');
    });

    return (
        movement && (
            <motion.div
                key="moving-token"
                className={styles.tokenMovement}
                initial={{
                    ...getPositionOffsetByTokenRadius(
                        getScaledPosition(initial),
                    ),
                }}
                onAnimationComplete={({ exitTransition }) => {
                    if (!exitTransition) {
                        finishMovement
                            ? finishMovement()
                            : defaultFinishMovement();
                    }
                }}
                animate={{
                    ...getPositionOffsetByTokenRadius(
                        getScaledPosition(movement.destination),
                    ),
                    scale: 1.5,
                }}
                transition={{
                    scale: { duration: 0.5 },
                    duration: 1,
                    type: 'string',
                }}
                exit={{
                    scale: 1,
                    rotate: movement.destination.angle,
                    transition: {
                        type: 'string',
                        duration: 0.3,
                    },
                    exitTransition: true,
                }}
            >
                <Token token={token ? token : movement.token}></Token>
            </motion.div>
        )
    );
}
