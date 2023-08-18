import classnames from 'classnames';
import { forwardRef, useContext } from 'react';

import { SizingContext, TurnState } from '../../context';
import { Token } from '../Token';
import styles from './Location.module.scss';

function LocationWithoutRef({ location, classes }, ref) {
    const { locationSize } = useContext(SizingContext);
    const { establishedState } = useContext(TurnState);

    const establishedLocationToken = establishedState[location.id];

    const style = {
        width: locationSize,
        height: locationSize,
        transform: `translate(-${locationSize / 2}px,-${locationSize / 2}px`,
        left: location.x * 100 + '%',
        top: location.y * 100 + '%',
    };

    const tokenRotation =
        (establishedLocationToken?.turned
            ? location.angle + 180
            : location.angle) + 'deg';

    return (
        <div
            ref={ref}
            key={location.id}
            className={classnames(styles.location, classes)}
            style={style}
        >
            {establishedLocationToken && (
                <Token
                    style={{ rotate: tokenRotation }}
                    {...establishedLocationToken}
                />
            )}
        </div>
    );
}

export const Location = forwardRef(LocationWithoutRef);
