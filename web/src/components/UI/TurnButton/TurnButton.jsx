import { useContext } from 'react';

import { ActiveState, SizingContext, TurnState } from '../../../context';
import styles from './TurnButton.module.scss';

export function TurnButton() {
    const { playersTurn } = useContext(TurnState);
    const { activeToken, endTurnActivity } = useContext(ActiveState);
    const { locationSize } = useContext(SizingContext);

    return (
        <button
            disabled={!activeToken || !playersTurn}
            className={styles.turnButton}
            onClick={endTurnActivity}
            style={{ height: locationSize + 12 }}
        >
            {playersTurn ? 'End Turn' : 'Wait'}
        </button>
    );
}
