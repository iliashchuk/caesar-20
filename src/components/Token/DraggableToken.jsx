import { useDraggable } from '@dnd-kit/core';

import { Token } from './Token';
import styles from './Token.module.scss';

export function DraggableToken({ side, id }) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id,
        data: { side, id },
    });

    return (
        <div
            className={styles.dragHandle}
            ref={setNodeRef}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            {...listeners}
            {...attributes}
        >
            <Token side={side} id={id} />
        </div>
    );
}
