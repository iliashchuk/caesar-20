import { useContext } from 'react';

import { SizingContext } from '../../context/Sizing';
import styles from './Token.module.scss';

export function Token({ side, id }) {
    const { locationSize } = useContext(SizingContext);
    const imagePath = `/${side}/${id}.png`;

    return (
        <img className={styles.token} width={locationSize} src={imagePath} />
    );
}
