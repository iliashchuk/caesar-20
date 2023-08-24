import { DndContext, DragOverlay, pointerWithin } from '@dnd-kit/core';
import { useContext, useMemo, useState } from 'react';

import { ActiveState, SizingContext } from '../../context';
import { createCircleCollisionDetectionForRadius } from '../../static/circleCollision';
import { Token } from '../Token/Token';

export function TokenDragContext({ children }) {
    const [movingToken, setMovingToken] = useState(false);
    const { locationRadius } = useContext(SizingContext);
    const { updateActiveState } = useContext(ActiveState);

    const collisionDetection = useMemo(
        () =>
            locationRadius
                ? createCircleCollisionDetectionForRadius(locationRadius)
                : pointerWithin,
        [locationRadius],
    );

    function handleDragEnd(event) {
        if (!event.over?.id) {
            return;
        }

        const location = event.over.data.current;
        const token = event.active.data.current;

        updateActiveState(location, token);
    }

    function handleDragStart(event) {
        if (!event.active.data.current) {
            return;
        }

        setMovingToken(event.active.data.current);
    }

    return (
        <DndContext
            collisionDetection={collisionDetection}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
        >
            <DragOverlay>
                {movingToken && <Token token={movingToken} make3d />}
            </DragOverlay>
            {children}
        </DndContext>
    );
}
