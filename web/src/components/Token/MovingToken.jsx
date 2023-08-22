import { motion } from 'framer-motion';
import { useContext } from 'react';

import { SizingContext, TokenMovement } from '../../context';
import { Token } from './Token';

export function MovingToken({ initialLocation, token, finishMoving }) {
    const { scale } = useContext(SizingContext);
    const { destination } = useContext(TokenMovement);

    return (
        <motion.div
            onAnimationComplete={finishMoving}
            animate={{
                x: (destination.x - initialLocation.x) * scale.width,
                y: (destination.y - initialLocation.y) * scale.height,
            }}
            transition={{ duration: 3, type: 'spring' }}
        >
            <Token token={token}></Token>
        </motion.div>
    );
}
