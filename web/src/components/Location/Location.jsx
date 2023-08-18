import { useDroppable } from '@dnd-kit/core';
import classnames from 'classnames';
import { useContext, useEffect, useMemo, useState } from 'react';
import { OutPortal } from 'react-reverse-portal';

import { ActiveState, SizingContext, TurnState } from '../../context';
import { Token } from '../Token';
import styles from './Location.module.scss';

export function Location({ location }) {
    const { locationSize } = useContext(SizingContext);
    const { establishedState } = useContext(TurnState);
    const { activeLocation, activeToken, flipActiveToken } =
        useContext(ActiveState);
    const [disabled, setDisabled] = useState(true);

    const establishedLocationToken = establishedState[location.id];
    const activeLocationToken =
        activeLocation?.id === location.id && activeToken;

    const { setNodeRef, active } = useDroppable({
        id: location.id,
        data: location,
        disabled,
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

    const draggedTokenType = active?.data.current.type;

    useEffect(() => {
        if (establishedLocationToken || !draggedTokenType) {
            setDisabled(true);
            return;
        }

        if (draggedTokenType === location.type || draggedTokenType === 'wild') {
            setDisabled(false);
            return;
        }
    }, [draggedTokenType, establishedLocationToken, location.type]);

    const childToken = useMemo(() => {
        if (establishedLocationToken) {
            const rotate =
                (establishedLocationToken.flipped
                    ? location.angle + 180
                    : location.angle) + 'deg';

            return <Token style={{ rotate }} {...establishedLocationToken} />;
        }
        if (activeLocationToken) {
            return (
                <OutPortal
                    node={activeLocationToken.portalNode}
                    rotation={
                        activeLocationToken.flipped
                            ? location.angle + 180
                            : location.angle
                    }
                    toggleFlipped={() => {
                        flipActiveToken();
                    }}
                />
            );
        }
    }, [
        establishedLocationToken,
        activeLocationToken,
        location,
        flipActiveToken,
    ]);

    return (
        <div
            ref={setNodeRef}
            onClick={() => {
                alert(location.id);
            }}
            key={location.id}
            className={classnames(styles.location, {
                [styles.available]: !disabled,
            })}
            style={style}
        >
            {childToken}
        </div>
    );
}
