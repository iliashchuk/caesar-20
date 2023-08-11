import { DraggableToken } from '../Token';
import styles from './Hand.module.scss';

export function Hand({ tokens }) {
    console.log(tokens);
    return (
        <div className={styles.hand}>
            {tokens.map((tokenId) => (
                <DraggableToken key={tokenId} side="caesar" id={tokenId} />
            ))}
        </div>
    );
}
