import classnames from 'classnames';
import { forwardRef, useContext } from 'react';

import { SizingContext, TokenMovement } from '../../context';
import styles from './Location.module.scss';

function LocationWithoutRef({ location, classes, children }, ref) {
    const { locationSize } = useContext(SizingContext);
    const { moveControlToken, moveOpponentToken } = useContext(TokenMovement);

    const style = {
        width: locationSize,
        height: locationSize,
        left: `calc(${location.x * 100}% - ${locationSize / 2}px)`,
        top: `calc(${location.y * 100}% - ${locationSize / 2}px)`,
    };

    return (
        <div
            // this is debug
            onClick={() =>
                location.id.includes('-')
                    ? moveOpponentToken(
                          { side: 'pompey', id: 'backside' },
                          location,
                      )
                    : moveControlToken('caesar', location)
            }
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
