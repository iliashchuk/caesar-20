import { useDroppable } from '@dnd-kit/core';
import classnames from 'classnames';
import { useContext, useEffect, useState } from 'react';

import { TurnState } from '../../context';
import { Location } from './Location';
import styles from './Location.module.scss';

export function DroppableLocation({ location }) {
    const { establishedState } = useContext(TurnState);
    const [disabled, setDisabled] = useState(true);

    const establishedLocationToken = establishedState[location.id];

    const { setNodeRef, active } = useDroppable({
        id: location.id,
        data: location,
        disabled,
    });

    const draggedTokenType = active?.data.current.type;

    useEffect(() => {
        if (establishedLocationToken || !draggedTokenType) {
            setDisabled(true);
            return;
        }

        if (draggedTokenType === location.type || draggedTokenType === 'wild') {
            setDisabled(false);
            return;
        }
    }, [draggedTokenType, establishedLocationToken, location.type]);

    return (
        <Location
            location={location}
            ref={setNodeRef}
            key={location.id}
            classes={classnames({
                [styles.available]: !disabled,
            })}
        ></Location>
    );
}
