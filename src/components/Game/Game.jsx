import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core';
import { useContext, useState } from 'react';

import { SizingContext, TurnState } from '../../context';
import locations from '../../static/locations.json';
import { Hand } from '../Hand';
import { Location } from '../Location';
import { Map } from '../Map';
import { Token } from '../Token';
import styles from './Game.module.scss';

function Game() {
    const { updateActiveState } = useContext(TurnState);
    const [draggedToken, setDraggedToken] = useState();
    const [collisions, setCollisions] = useState([]);

    function handleDragStart(event) {
        setDraggedToken(event.active.data.current);
    }

    function handleDragEnd(event) {
        const location = event.over.id;
        const token = event.active.data.current;

        updateActiveState(location, token);
    }

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            onDragMove={(event) => {
                console.log(event);
                if (event.collisions) {
                    if (event.collisions.length > collisions.length) {
                        setCollisions(event.collisions);
                        console.log(collisions);
                    }
                }
            }}
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
            <DragOverlay>
                {draggedToken && <Token {...draggedToken}></Token>}
            </DragOverlay>
            <Hand />
        </DndContext>
    );
}

export default Game;
