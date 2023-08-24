import classnames from 'classnames';
import { useContext } from 'react';

import { GameContext, TokenMovement, TurnState } from '../../context';
import { getOpponentSide } from '../../utils';
import { MovingToken, Token } from '../Token';
import styles from './Hand.module.scss';

export function OpponentHand() {
    const { opponentTokenNumber } = useContext(TurnState);
    const { side } = useContext(GameContext);
    const { activeMovement } = useContext(TokenMovement);

    const opponentMovingTokenLocation = {
        x: 0.5,
        y: 0,
    };

    const isOpponentTokenMoving =
        activeMovement && activeMovement.origin === 'opponent';

    const blankTokens = Array.from(
        Array(opponentTokenNumber - (isOpponentTokenMoving ? 1 : 0)).keys(),
    );

    return (
        <>
            {isOpponentTokenMoving && (
                <MovingToken initial={opponentMovingTokenLocation} />
            )}
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
