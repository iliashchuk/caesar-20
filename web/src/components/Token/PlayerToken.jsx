import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import { MovableToken } from './MovableToken';
import styles from './Token.module.scss';

export function PlayerToken({ token, rotation, portalNode, toggleFlipped }) {
    const { attributes, listeners, setNodeRef, isDragging, transform } =
        useDraggable({
            id: token.id,
            data: { ...token, portalNode },
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
            style={{
                transform: transformStyle,
            }}
            {...listeners}
            {...attributes}
        >
            <MovableToken
                rotation={rotation}
                isMoving={isDragging}
                token={token}
            />
        </div>
    );
}
