import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Game } from './components/Game';
import { UserProvider } from './context/User';
import { Root } from './routes';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
    },
    {
        path: '/:game-id',
        element: <Game />,
    },
]);

export function App() {
    return (
        <UserProvider>
            <RouterProvider router={router} />
            <Game />
        </UserProvider>
    );
}
