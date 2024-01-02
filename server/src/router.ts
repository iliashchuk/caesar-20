import Router from '@koa/router';
import { createGameController } from './controllers/createGame.js';

const router = new Router();

router.get('/', (ctx) => {
    ctx.body = { body: 'hello world' };
});

router.get('/create-game', (ctx) => {
    ctx.body = { body: 'hello world' };
});

router.post('/create-game', createGameController);

export default router;
