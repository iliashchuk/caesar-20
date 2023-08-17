import { Game } from './components/Game';
import { GameContextProvider, SizingProvider } from './context';
import { UserProvider } from './context/User';

export function App() {
    return (
        <UserProvider>
            <SizingProvider>
                <GameContextProvider>
                    <Game />
                </GameContextProvider>
            </SizingProvider>
        </UserProvider>
    );
}
