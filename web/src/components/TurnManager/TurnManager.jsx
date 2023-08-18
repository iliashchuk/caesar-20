import { DndContext, pointerWithin } from '@dnd-kit/core';
import { useContext, useMemo } from 'react';

import { ActiveState, SizingContext } from '../../context';
import { createCircleCollisionDetectionForRadius } from '../../static/circleCollision';
import { Hand } from '../Hand';
import { AvailableLocations, EstablishedLocations } from '../Locations';
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
            {scale && (
                <>
                    <EstablishedLocations />
                    <AvailableLocations />
                </>
            )}
        </DndContext>
    );
}
