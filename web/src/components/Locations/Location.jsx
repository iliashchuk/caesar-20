import classnames from 'classnames';
import { forwardRef, useContext } from 'react';

import { SizingContext } from '../../context';
import styles from './Location.module.scss';

function LocationWithoutRef({ location, classes, children }, ref) {
    const { locationSize } = useContext(SizingContext);

    const style = {
        width: locationSize,
        height: locationSize,
        transform: `translate(-${locationSize / 2}px,-${locationSize / 2}px`,
        left: location.x * 100 + '%',
        top: location.y * 100 + '%',
    };

    return (
        <div
            ref={ref}
            key={location.id}
            className={classnames(styles.location, classes)}
            style={style}
        >
            {children}
        </div>
    );
}

export const Location = forwardRef(LocationWithoutRef);
