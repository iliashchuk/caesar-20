import { DndContext, pointerWithin } from '@dnd-kit/core';
import { useContext, useMemo } from 'react';

import { ActiveState, SizingContext } from '../../context';
import { createCircleCollisionDetectionForRadius } from '../../static/circleCollision';
import locations from '../../static/locations.json';
import { Hand } from '../Hand';
import { DroppableLocation } from '../Location';
import { TokenCounter } from '../TokenCounter';
import { TurnButton } from '../TurnButton';
import styles from './TurnManager.module.scss';

export function TurnManager() {
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

    return (
        <DndContext
            collisionDetection={collisionDetection}
            onDragEnd={handleDragEnd}
        >
            <div
                style={{ height: locationSize + 24 }}
                className={styles.playerUi}
            >
                <TokenCounter />
                <Hand />
                <TurnButton />
            </div>
            {scale &&
                locations.map((location) => (
                    <DroppableLocation key={location.id} location={location} />
                ))}
        </DndContext>
    );
}
