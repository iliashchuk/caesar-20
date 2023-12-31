import { useDraggable } from '@dnd-kit/core';
import { useContext } from 'react';

import { ActiveState } from '../../context';
import { Token } from './Token';
import styles from './Token.module.scss';

// a token you can start a drag with
// but no a token displayed during dragging - that's in TokenDragContext
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
            {!isDragging && <Token rotation={rotation} token={token} />}
        </div>
    );
}
