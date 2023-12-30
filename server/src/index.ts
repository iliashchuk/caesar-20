import { Server } from 'socket.io';

import { createGameServer } from './logic/GameServer.js';

const io = new Server({
    cors: {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    },
});

createGameServer(io);

io.listen(3000);
