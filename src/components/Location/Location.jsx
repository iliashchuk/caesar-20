import { useDroppable } from '@dnd-kit/core';
import { useContext, useEffect, useMemo, useState } from 'react';
import { OutPortal } from 'react-reverse-portal';

import { SizingContext, TurnState } from '../../context';
import { Token } from '../Token';
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
            return (
                <Token
                    rotation={flipped ? location.angle + 180 : location.angle}
                    {...establishedLocationToken}
                />
            );
        }
        if (activeLocationToken) {
            return (
                <OutPortal
                    node={activeLocationToken.portalNode}
                    rotation={flipped ? location.angle + 180 : location.angle}
                    toggleFlipped={() => {
                        setFlipped(!flipped);
                    }}
                />
            );
        }
    }, [
        establishedLocationToken,
        activeLocationToken,
        flipped,
        location.angle,
    ]);

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
            {childToken}
        </div>
    );
}
