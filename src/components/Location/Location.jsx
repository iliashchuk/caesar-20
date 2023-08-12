import { useDroppable } from '@dnd-kit/core';
import { useContext, useEffect, useMemo, useState } from 'react';

import { SizingContext, TurnState } from '../../context';
import { DraggableToken, Token } from '../Token';
import styles from './Location.module.scss';

export function Location({ location }) {
    const { locationSize } = useContext(SizingContext);
    const { activeState, establishedState } = useContext(TurnState);
    const [flipped, setFlipped] = useState(false);

    const establishedLocationToken = establishedState[location.name];
    const activeLocationToken = activeState[location.name];

    const { setNodeRef } = useDroppable({
        id: location.name,
        disabled: !!establishedLocationToken,
    });

    const translateFunction = `translate(-${locationSize / 2}px,-${
        locationSize / 2
    }px`;
    const style = {
        width: locationSize,
        height: locationSize,
        transform: translateFunction,
        left: location.x * 100 + '%',
        top: location.y * 100 + '%',
    };

    useEffect(() => {
        if (!establishedLocationToken || activeLocationToken) {
            setFlipped(false);
        }
    }, [establishedLocationToken, activeLocationToken, setFlipped]);

    const childToken = useMemo(() => {
        if (establishedLocationToken) {
            return <Token side="caesar" id={establishedLocationToken.id} />;
        }
        if (activeLocationToken) {
            return <DraggableToken side="caesar" id={activeLocationToken.id} />;
        }
    }, [establishedLocationToken, activeLocationToken]);
    const tokenStyles = {
        transform: `rotate(${
            flipped ? location.angle + 180 : location.angle
        }deg)`,
        transition: 'all .3s ease-in',
    };

    const handleTokenRightClick = (e) => {
        e.preventDefault();

        setFlipped(!flipped);
    };

    return (
        <div
            ref={setNodeRef}
            onClick={() => {
                alert(location.name);
            }}
            key={location.name}
            className={styles.location}
            style={style}
        >
            <div onContextMenu={handleTokenRightClick} style={tokenStyles}>
                {childToken}
            </div>
        </div>
    );
}
