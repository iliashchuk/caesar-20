import { DndContext, pointerWithin } from '@dnd-kit/core';
import { useContext, useMemo } from 'react';

import { SizingContext, TurnState } from '../../context';
import locations from '../../static/locations.json';
import { Hand } from '../Hand';
import { Location } from '../Location';
import { Map } from '../Map';
import styles from './Game.module.scss';
import { createCircleCollisionDetectionForRadius } from './circleCollision';

function Game() {
    const { updateActiveState } = useContext(TurnState);
    const { locationRadius } = useContext(SizingContext);

    function handleDragEnd(event) {
        if (!event.over?.id) {
            return;
        }

        const location = event.over.id;
        const token = event.active.data.current;

        updateActiveState(location, token);
    }

    const collisionDetection = useMemo(
        () =>
            locationRadius
                ? createCircleCollisionDetectionForRadius(locationRadius)
                : pointerWithin,
        [locationRadius],
    );

    return (
        <DndContext
            collisionDetection={collisionDetection}
            onDragEnd={handleDragEnd}
        >
            <div className={styles.container}>
                <Map />
                <SizingContext.Consumer>
                    {({ scale }) =>
                        scale &&
                        locations.map((location) => (
                            <Location key={location.name} location={location} />
                        ))
                    }
                </SizingContext.Consumer>
            </div>
            <Hand />
        </DndContext>
    );
}

export default Game;
