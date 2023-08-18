import { useDraggable } from '@dnd-kit/core';
import { useContext } from 'react';

import { ActiveState } from '../../context';
import { MovableToken } from './MovableToken';
import styles from './Token.module.scss';

export function PlayerToken({ token, rotation }) {
    const { turnActiveToken } = useContext(ActiveState);
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: token.id,
        data: { ...token },
    });

    const handleTokenRightClick = (e) => {
        e.preventDefault();

        turnActiveToken();
    };

    return (
        <div
            onContextMenu={handleTokenRightClick}
            className={styles.dragHandle}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
        >
            {!isDragging && <MovableToken rotation={rotation} token={token} />}
        </div>
    );
}
