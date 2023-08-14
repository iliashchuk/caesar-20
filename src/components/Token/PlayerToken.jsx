import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import { Token } from './Token';
import styles from './Token.module.scss';

export function PlayerToken({
    id,
    side,
    type,
    power,
    rotation,
    portalNode,
    toggleFlipped,
}) {
    const { attributes, listeners, setNodeRef, isDragging, transform } =
        useDraggable({
            id,
            data: { side, id, type, power, portalNode },
        });

    const handleTokenRightClick = (e) => {
        e.preventDefault();

        if (toggleFlipped) {
            toggleFlipped();
        }
    };

    const transformStyle = transform ? CSS.Translate.toString(transform) : '';

    return (
        <div
            onContextMenu={handleTokenRightClick}
            className={styles.dragHandle}
            ref={setNodeRef}
            style={{ transform: transformStyle }}
            {...listeners}
            {...attributes}
        >
            <Token
                rotation={rotation}
                isDragging={isDragging}
                side={side}
                id={id}
            />
        </div>
    );
}
