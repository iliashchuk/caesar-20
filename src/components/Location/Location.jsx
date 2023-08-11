import { useContext } from 'react';

import { SizingContext } from '../../context';
import styles from './Location.module.scss';

export function Location({ location }) {
    const { locationSize } = useContext(SizingContext);

    const name = location.name;

    const style = {
        width: locationSize,
        height: locationSize,
        transform: `translate(-${locationSize / 2}px,-${locationSize / 2}px`,
        left: location.x * 100 + '%',
        top: location.y * 100 + '%',
    };

    return (
        <div
            onClick={() => {
                alert(location.name);
            }}
            key={name}
            className={styles.location}
            style={style}
        />
    );
}
