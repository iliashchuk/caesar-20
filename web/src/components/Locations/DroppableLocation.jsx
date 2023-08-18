import { useDroppable } from '@dnd-kit/core';
import classnames from 'classnames';
import { useEffect, useState } from 'react';

import { Location } from './Location';
import styles from './Location.module.scss';

export function DroppableLocation({ location }) {
    const [disabled, setDisabled] = useState(true);

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
