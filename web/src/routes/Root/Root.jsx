import { useContext } from 'react';
import styles from './Root.module.scss';
import { User } from '../../context/User';
import { useNavigate } from 'react-router-dom';

export function Root() {
    const { user } = useContext(User);
    const nav = useNavigate();

    async function postCreateGame() {
        const response = await fetch('http://localhost:3000/create-game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user }),
        });

        const body = await response.json();

        console.log(body);

        if (body.game) {
            nav(body.game);
        }
    }

    return (
        <div className={styles.root}>
            <h1>Welcome to Caesar20</h1>
            <button onClick={postCreateGame}>Create a game</button>
        </div>
    );
}
