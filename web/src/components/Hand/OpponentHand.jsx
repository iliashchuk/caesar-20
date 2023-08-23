import classnames from 'classnames';
import { useContext } from 'react';

import { GameContext, SizingContext, TurnState } from '../../context';
import { getOpponentSide } from '../../utils';
import { Token } from '../Token';
import styles from './Hand.module.scss';

export function OpponentHand() {
    const { opponentTokenNumber } = useContext(TurnState);
    const { side } = useContext(GameContext);
    const { locationSize } = useContext(SizingContext);

    return (
        <div
            className={classnames(styles.hand, styles.opponent)}
            style={{ height: locationSize + 24 }}
        >
            {Array.from(Array(opponentTokenNumber).keys()).map((key) => (
                <Token
                    key={key}
                    token={{ side: getOpponentSide(side), id: 'backside' }}
                />
            ))}
        </div>
    );
}
