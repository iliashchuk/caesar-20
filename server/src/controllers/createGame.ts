import { Middleware } from 'koa';
import { v4 as uuid4 } from 'uuid';

interface CreateGamePayload {
    user: string;
}

export const createGameController: Middleware = (ctx) => {
    const payload = <CreateGamePayload>ctx.request.body;

    ctx.body = {
        user: payload.user,
        game: uuid4(),
    };
};
