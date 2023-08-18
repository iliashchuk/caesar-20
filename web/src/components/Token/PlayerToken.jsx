import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useContext } from 'react';

import { ActiveState } from '../../context';
import { MovableToken } from './MovableToken';
import styles from './Token.module.scss';

export function PlayerToken({ token, rotation, portalNode }) {
    const { turnActiveToken } = useContext(ActiveState);
    const { attributes, listeners, setNodeRef, isDragging, transform } =
        useDraggable({
            id: token.id,
            data: { ...token, portalNode },
        });

    const handleTokenRightClick = (e) => {
        e.preventDefault();

        turnActiveToken();
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
