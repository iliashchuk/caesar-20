import { useContext, useMemo } from 'react';

import { SizingContext } from '../../context/Sizing';
import styles from './Token.module.scss';

function getImagePath(side, file) {
    let directory = '';

    switch (side) {
        case 'pompey':
            directory = '/influence';
            break;
        case 'caesar':
            directory = '/influence';
            break;
        case 'bonus':
            directory = '/bonus';
            break;
    }

    return `${directory}/${file}.png`;
}

export function Token({ side, id, style, make3d = true }) {
    const { locationSize } = useContext(SizingContext);

    const imagePath = useMemo(() => getImagePath(side, id), [side, id]);

    if (!locationSize) {
        return null;
    }

    const filter =
        side === 'pompey'
            ? 'hue-rotate(220deg) saturate(0.4) brightness(1.25)'
            : '';

    const imageElement = (
        <img
            style={{ filter, ...style }}
            alt={`${side}-${id}`}
            className={styles.token}
            width={locationSize}
            height={locationSize}
            src={imagePath}
        />
    );

    if (!make3d) {
        return imageElement;
    }

    return <div className={styles.token3dContainer}>{imageElement}</div>;
}
