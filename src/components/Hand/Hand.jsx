import { Token } from '../Token';
import styles from './Hand.module.scss';

export function Hand() {
    return (
        <div className={styles.hand}>
            <Token side="caesar" id="swords-2-4" />
            <Token side="caesar" id="swords-2-4" />
            <Token side="caesar" id="swords-2-4" />
            <Token side="caesar" id="swords-2-4" />
            <Token side="caesar" id="swords-2-4" />
        </div>
    );
}
