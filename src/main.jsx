import React from 'react';
import ReactDOM from 'react-dom/client';

import Game from './Game.jsx';
import './index.module.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Game />
    </React.StrictMode>,
);
