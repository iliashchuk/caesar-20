import { useDraggable } from '@dnd-kit/core';

import { Token } from './Token';
import styles from './Token.module.scss';

export function PlayerToken({ id, side, type, power, rotation }) {

    const { attributes, listeners, setNodeRef, isDragging, transform } =
        useDraggable({
            id,
            data: { side, id, type, power },
        });

    return (
        <div
            className={styles.dragHandle}
            ref={setNodeRef}
            style={{
                scale: `${isDragging ? 1.1 : 1}`,
                transform: transform
                    ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
                    : '',
                transition: 'scale .3s',
            }}
            {...listeners}
            {...attributes}
        >
            <Token rotation={rotation} side={side} id={id} />
        </div>
    );
}
