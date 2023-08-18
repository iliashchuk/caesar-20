import { useDroppable } from '@dnd-kit/core';
import classnames from 'classnames';
import { useContext, useEffect, useState } from 'react';

import { ActiveState } from '../../context';
import { PlayerToken } from '../Token';
import { Location } from './Location';
import styles from './Location.module.scss';

export function DroppableLocation({ location }) {
    const [disabled, setDisabled] = useState(true);
    const { activeLocation, activeToken } = useContext(ActiveState);

    const { setNodeRef, active } = useDroppable({
        id: location.id,
        data: location,
        disabled,
    });

    const draggedTokenType = active?.data.current.type;

    useEffect(() => {
        if (!draggedTokenType) {
            setDisabled(true);
            return;
        }

        if (draggedTokenType === location.type || draggedTokenType === 'wild') {
            setDisabled(false);
            return;
        }
    }, [draggedTokenType, location.type]);
    const tokenRotation =
        (activeToken?.turned ? location.angle + 180 : location.angle) + 'deg';

    const activeLocationToken =
        activeLocation?.id === location.id && activeToken;

    return (
        <Location
            location={location}
            ref={setNodeRef}
            key={location.id}
            classes={classnames({
                [styles.available]: !disabled,
            })}
        >
            {activeLocationToken && (
                <PlayerToken
                    rotation={tokenRotation}
                    token={activeLocationToken}
                />
            )}
        </Location>
    );
}
