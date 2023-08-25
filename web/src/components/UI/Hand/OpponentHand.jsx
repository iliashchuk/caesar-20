import classnames from 'classnames';
import { useContext } from 'react';

import { GameContext, Tokens } from '../../../context';
import { getOpponentSide } from '../../../utils';
import { Token } from '../../Token';
import styles from './Hand.module.scss';

export function OpponentHand({ isOpponentTokenMoving }) {
    const { opponentTokenNumber } = useContext(Tokens);
    const { side } = useContext(GameContext);

    const blankTokens = Array.from(
        Array(opponentTokenNumber - (isOpponentTokenMoving ? 1 : 0)).keys(),
    );

    return (
        <>
            <div className={classnames(styles.hand, styles.opponent)}>
                {blankTokens.map((key) => (
                    <Token
                        key={key}
                        token={{ side: getOpponentSide(side), id: 'backside' }}
                    />
                ))}
            </div>
        </>
    );
}
