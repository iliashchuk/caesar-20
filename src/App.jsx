import Game from './components/Game/Game';
import { SizingProvider, TurnStateProvider } from './context';

export function App() {
    return (
        <SizingProvider>
            <TurnStateProvider>
                <Game />
            </TurnStateProvider>
        </SizingProvider>
    );
}
