import { useEffect, useState } from 'react';

import { Token } from './Token';

export function MovableToken({ isMoving, rotation, token }) {
    const [angle, setAngle] = useState(0);
    const [scale, setScale] = useState(1);
    const [shadow, setShadow] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (isMoving) {
                setAngle(0);
                setScale(1.3);
                setShadow('8px 6px #000000aa');
            } else {
                setAngle(rotation);
                setScale(1);
                setShadow('');
            }
        }, 0);

        return () => {
            clearTimeout(timeout);
        };
    }, [rotation, isMoving, setAngle]);

    return (
        <div
            style={{
                borderRadius: '50%',
                boxShadow: shadow,
                transition: 'box-shadow 0.5s, scale 0.5s',
                scale: `${scale}`,
            }}
        >
            <Token
                style={{
                    rotate: `${angle}deg`,
                    transition: 'rotate 0.4s',
                }}
                {...token}
            />
        </div>
    );
}
