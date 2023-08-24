import classnames from 'classnames';
import { useContext } from 'react';

import { SizingContext } from '../../context';
import { TokenMovementProvider } from '../../context';
import { OpponentControlSlots, PlayerControlSlots } from '../ControlSlots';
import { Hand } from '../Hand';
import { OpponentHand } from '../Hand/OpponentHand';
import { AvailableLocations, EstablishedLocations } from '../Locations';
import { TokenCounter } from '../TokenCounter';
import { TokenDragContext } from '../TokenDragContext/TokenDragContext';
import { TurnButton } from '../TurnButton';
import styles from './TurnManager.module.scss';

export function TurnManager() {
    const { locationSize, scale } = useContext(SizingContext);

    return (
        <TokenDragContext>
            <TokenMovementProvider>
                <div
                    style={{ height: locationSize + 24 }}
                    className={classnames(styles.ui, styles.playerUi)}
                >
                    <TokenCounter />
                    <Hand />
                    <TurnButton />
                </div>
                <div
                    className={styles.ui}
                    style={{
                        height: locationSize + 24,
                        top: -(locationSize + 24) / 2,
                    }}
                >
                    <OpponentHand />
                </div>
                {scale && (
                    <>
                        <EstablishedLocations />
                        <AvailableLocations />
                        <PlayerControlSlots />
                        <OpponentControlSlots />
                    </>
                )}
            </TokenMovementProvider>
        </TokenDragContext>
    );
}
