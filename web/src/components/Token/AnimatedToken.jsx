import { motion } from 'framer-motion';
import { useContext, useLayoutEffect, useMemo, useState } from 'react';

import { SizingContext } from '../../context';
import { Token } from './Token';
import styles from './Token.module.scss';

export function AnimatedToken({ origin, destination, token, finishMovement }) {
    const { getScaledPosition, getPositionOffsetByTokenRadius } =
        useContext(SizingContext);
    const [movement, setMovement] = useState();

    // this is needed to keep the animation data
    // when the AnimatedToken is removed from the DOM to perform exit animation
    useLayoutEffect(() => {
        setMovement({ origin, destination, token });
    }, []);

    const rotate = useMemo(() => {
        if (!movement) {
            return;
        }

        const { destination, token } = movement;

        if (!token.turned) {
            return destination.angle;
        }

        const positivelyAdjustedAngle = destination.angle + 180;

        if (positivelyAdjustedAngle >= 180) {
            return destination.angle - 180;
        }

        return positivelyAdjustedAngle;
    }, [movement]);

    return (
        movement && (
            <motion.div
                key="moving-token"
                className={styles.tokenMovement}
                initial={{
                    ...getPositionOffsetByTokenRadius(
                        getScaledPosition(origin),
                    ),
                }}
                onAnimationComplete={({ exitTransition }) => {
                    if (!exitTransition) {
                        finishMovement();
                    }
                }}
                animate={{
                    ...getPositionOffsetByTokenRadius(
                        getScaledPosition(
                            destination ? destination : movement.destination,
                        ),
                    ),
                    boxShadow: '10px 12px #000000aa',
                    scale: 1.5,
                }}
                transition={{
                    scale: { duration: 0.5 },
                    duration: 1,
                    type: 'string',
                }}
                exit={{
                    scale: 1,
                    boxShadow: '0px 0px #000000',
                    transition: {
                        type: 'string',
                        duration: 0.3,
                    },
                    exitTransition: true,
                }}
            >
                <motion.div
                    animate={{ rotate }}
                    transition={{ delay: 1, duration: 0.3 }}
                >
                    <Token token={movement.token} make3d={false}></Token>
                </motion.div>
            </motion.div>
        )
    );
}
