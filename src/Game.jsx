import { DndContext } from '@dnd-kit/core';
import { useState } from 'react';

import styles from './Game.module.scss';
import { Hand } from './components/Hand';
import { Location } from './components/Location';
import { Map } from './components/Map';
import { DraggableToken } from './components/Token';
import { SizingContext, SizingProvider } from './context';
import locations from './static/locations.json';

function Game() {
    const [droppedTokens, setDroppedTokens] = useState({});
    const [hand, setHand] = useState(['swords-2-4']);

    function handleDragEnd(event) {
        setDroppedTokens({
            ...droppedTokens,
            [event.over.id]: event.active.data.current,
        });
        setHand(
            hand.filter((tokenId) => tokenId !== event.active.data.current.id),
        );
    }

    function getDroppedTokenForLocation(location) {
        const droppedData = droppedTokens[location.name];
        console.log(droppedData);
        if (!droppedData) {
            return null;
        }

        console.log('ree');
        return <DraggableToken {...droppedData} />;
    }

    return (
        <SizingProvider>
            <DndContext onDragEnd={handleDragEnd}>
                <div className={styles.container}>
                    <Map />
                    <SizingContext.Consumer>
                        {({ scale }) =>
                            scale &&
                            locations.map((location) => (
                                <Location
                                    key={location.name}
                                    location={location}
                                >
                                    {getDroppedTokenForLocation(location)}
                                </Location>
                            ))
                        }
                    </SizingContext.Consumer>
                </div>
                <Hand tokens={hand} />
            </DndContext>
        </SizingProvider>
    );
}

export default Game;
