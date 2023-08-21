import { useContext } from 'react';

import { SizingContext } from '../../context';
import { OpponentControlSlots, PlayerControlSlots } from '../ControlSlots';
import { Hand } from '../Hand';
import { AvailableLocations, EstablishedLocations } from '../Locations';
import { TokenCounter } from '../TokenCounter';
import { TokenDragContext } from '../TokenDragContext/TokenDragContext';
import { TurnButton } from '../TurnButton';
import styles from './TurnManager.module.scss';

export function TurnManager() {
    const { locationSize, scale } = useContext(SizingContext);

    return (
        <TokenDragContext>
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
                    <PlayerControlSlots />
                    <OpponentControlSlots />
                    <EstablishedLocations />
                    <AvailableLocations />
                </>
            )}
        </TokenDragContext>
    );
}
