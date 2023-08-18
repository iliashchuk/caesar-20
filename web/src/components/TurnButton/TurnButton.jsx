import { useContext } from 'react';

import { SizingContext, TurnState } from '../../context';
import styles from './TurnButton.module.scss';

export function TurnButton() {
    const { playersTurn, endTurn, canEndTurn } = useContext(TurnState);
    const { locationSize } = useContext(SizingContext);

    return (
        <button
            disabled={!canEndTurn}
            className={styles.turnButton}
            onClick={endTurn}
            style={{ height: locationSize + 12 }}
        >
            {playersTurn ? 'End Turn' : 'Wait'}
        </button>
    );
}
