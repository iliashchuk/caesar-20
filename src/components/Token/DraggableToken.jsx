import { useDraggable } from '@dnd-kit/core';

import { Token } from './Token';
import styles from './Token.module.scss';

export function DraggableToken({ side, id }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
        data: { side, id },
    });
    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined;

    return (
        <div
            className={styles.dragHandle}
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
        >
            <Token side={side} id={id} />
        </div>
    );
}
