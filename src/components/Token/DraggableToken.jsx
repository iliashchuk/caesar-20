import { useDraggable } from '@dnd-kit/core';

import { Token } from './Token';

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
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <Token side={side} id={id} />
        </div>
    );
}
