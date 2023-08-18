import { DndContext, DragOverlay, pointerWithin } from '@dnd-kit/core';
import { useContext, useMemo, useState } from 'react';

import { ActiveState, SizingContext } from '../../context';
import { createCircleCollisionDetectionForRadius } from '../../static/circleCollision';
import { Hand } from '../Hand';
import { AvailableLocations, EstablishedLocations } from '../Locations';
import { MovableToken } from '../Token/MovableToken';
import { TokenCounter } from '../TokenCounter';
import { TurnButton } from '../TurnButton';
import styles from './TurnManager.module.scss';

export function TurnManager() {
    const [movingToken, setMovingToken] = useState(false);
    const { scale, locationRadius, locationSize } = useContext(SizingContext);
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
            <DragOverlay
                dropAnimation={{
                    duration: 300,
                }}
            >
                <MovableToken
                    rotation={0}
                    isMoving={!!movingToken}
                    token={movingToken}
                />
            </DragOverlay>
            <div
                style={{ height: locationSize + 24 }}
                className={styles.playerUi}
            >
                <TokenCounter />
                <Hand />
                <TurnButton />
            </div>
            {scale && (
                <>
                    <EstablishedLocations />
                    <AvailableLocations />
                </>
            )}
        </DndContext>
    );
}
