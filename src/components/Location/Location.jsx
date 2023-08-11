import { useDroppable } from '@dnd-kit/core';
import { useContext, useMemo } from 'react';

import { SizingContext, TurnState } from '../../context';
import { DraggableToken, Token } from '../Token';
import styles from './Location.module.scss';

export function Location({ location }) {
    const { locationSize } = useContext(SizingContext);
    const { activeState, establishedState } = useContext(TurnState);
    const establishedLocationToken = establishedState[location.name];
    const activeLocationToken = activeState[location.name];

    const { setNodeRef } = useDroppable({
        id: location.name,
        disabled: !!establishedLocationToken,
    });

    const name = location.name;

    const style = {
        width: locationSize,
        height: locationSize,
        transform: `translate(-${locationSize / 2}px,-${locationSize / 2}px`,
        left: location.x * 100 + '%',
        top: location.y * 100 + '%',
        borderRadius: '50%',
    };

    const childToken = useMemo(() => {
        if (establishedLocationToken) {
            return <Token side="caesar" id={establishedLocationToken.id} />;
        }
        if (activeLocationToken) {
            return <DraggableToken side="caesar" id={activeLocationToken.id} />;
        }
    }, [establishedLocationToken, activeLocationToken]);

    return (
        <div
            ref={setNodeRef}
            onClick={() => {
                alert(location.name);
            }}
            key={name}
            className={styles.location}
            style={style}
        >
            {childToken}
        </div>
    );
}
