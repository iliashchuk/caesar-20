import classNames from 'classnames';
import { useContext } from 'react';

import { SizingContext } from '../../context';
import { Hand } from './Hand';
import { TokenCounter } from './TokenCounter';
import { TurnButton } from './TurnButton';
import styles from './UI.module.scss';

export function PlayerUI() {
    const { locationSize } = useContext(SizingContext);
    return (
        <div
            style={{ height: locationSize + 24 }}
            className={classNames(styles.ui, styles.playerUi)}
        >
            <TokenCounter />
            <Hand />
            <TurnButton />
        </div>
    );
}
