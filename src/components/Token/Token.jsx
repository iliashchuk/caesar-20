import { useContext, useEffect, useState } from 'react';

import { SizingContext } from '../../context/Sizing';
import styles from './Token.module.scss';

export function Token({ side, id, rotation, isDragging }) {
    const { locationSize } = useContext(SizingContext);
    const [angle, setAngle] = useState(0);
    const [scale, setScale] = useState(1);
    const [shadow, setShadow] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (isDragging) {
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
    }, [rotation, isDragging, setAngle]);

    if (!locationSize) {
        return null;
    }

    const imagePath = `/${side}/${id}.png`;

    return (
        <div
            style={{
                borderRadius: '50%',
                boxShadow: shadow,
                transition: 'box-shadow 0.5s, scale 0.5s',
                scale: `${scale}`,
            }}
        >
            <img
                style={{
                    rotate: `${angle}deg`,
                    transition: 'rotate 0.4s',
                }}
                alt={`${side}-${id}`}
                className={styles.token}
                width={locationSize}
                height={locationSize}
                src={imagePath}
            />
        </div>
    );
}
