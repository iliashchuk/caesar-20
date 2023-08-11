import { useContext } from 'react';

import { SizingContext } from '../../context';
import styles from './Location.module.scss';

export function Location({ location }) {
    const { scale } = useContext(SizingContext);

    const size = location.size * scale.width * 2;
    const name = location.name;

    const style = {
        width: size,
        height: size,
        transform: `translate(-${size / 2}px,-${size / 2}px`,
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
