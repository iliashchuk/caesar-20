import Koa from 'koa';
import http from 'http';
import { Server as IoServer } from 'socket.io';
import bodyParser from 'koa-bodyparser';
import cors from 'koa-cors';
import router from './router.js';
import { createGameServer } from './logic/GameServer.js';

const app = new Koa();

const httpServer = http.createServer(app.callback()).listen(3000);

const io = new IoServer(httpServer, {
    cors: {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    },
});

createGameServer(io);

app.context.io = io;

app.on('error', (err) => console.log(err));

app.use(cors());

app.use(bodyParser());

app.use(router.routes());
