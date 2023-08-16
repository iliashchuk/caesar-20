import { useContext, useRef } from 'react';
import { useEffect } from 'react';

import { SizingContext } from '../../context';
import styles from './Map.module.scss';

export function Map() {
    const { setScale } = useContext(SizingContext);
    const imageRef = useRef(null);

    useEffect(() => {
        if (imageRef.current) {
            imageRef.current.addEventListener('load', (e) => {
                const { offsetWidth, offsetHeight } = e.target;
                setScale({ width: offsetWidth, height: offsetHeight });
            });
        }
    }, [imageRef, setScale]);

    return (
        <img ref={imageRef} src="/map.png" alt="Map" className={styles.map} />
    );
}
