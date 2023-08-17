import { DndContext, pointerWithin } from '@dnd-kit/core';
import { useContext, useMemo } from 'react';

import { SizingContext, TurnState } from '../../context';
import { createCircleCollisionDetectionForRadius } from '../../static/circleCollision';
import locations from '../../static/locations.json';
import { Hand } from '../Hand';
import { Location } from '../Location';
import { TurnButton } from '../TurnButton';
import { TokenCounter } from '../TokenCounter';
import styles from './TurnManager.module.scss';

export function TurnManager() {
    const { scale, locationRadius, locationSize } = useContext(SizingContext);
    const { updateActiveState } = useContext(TurnState);

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

        const location = event.over.id;
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
                    <Location key={location.name} location={location} />
                ))}
        </DndContext>
    );
}
