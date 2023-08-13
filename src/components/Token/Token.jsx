import { useContext } from 'react';

import { SizingContext } from '../../context/Sizing';
import styles from './Token.module.scss';

export function Token({ side, id, rotation }) {
    const { locationSize } = useContext(SizingContext);

    if (!locationSize) {
        return null;
    }

    const imagePath = `/${side}/${id}.png`;

    return (
        <img
            style={{
                transform: `rotate(${rotation}deg)`,
                transition: 'transform 0.3s ',
            }}
            alt={`${side}-${id}`}
            className={styles.token}
            width={locationSize}
            height={locationSize}
            src={imagePath}
        />
    );
}
