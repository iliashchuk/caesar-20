import { Server } from "socket.io";
import { Game } from "./Game.js";

function shortenId(id: string) {
    return id.slice(0, 8);
}

function logEmit(msg) {
    console.info("EMITTING: ", msg);
}

const io = new Server({
    cors: {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
    },
});

const game = new Game();

io.on("connection", async (socket) => {
    const user = shortenId(socket.handshake.auth.user);

    console.log(`a user ${user} connected by socket ${socket.id} `);

    if (!game.ready) {
        game.verifyOrAddPlayer(user);
    }

    console.log("Game", game.players);

    if (game.ready) {
        logEmit("game-ready");
        io.emit("game-ready", game.state);
        socket.emit("side-assigned", game.players[user]);
    }

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        game.disconnectPlayer(user);
        console.log(game.players);
        if (!game.ready) {
            logEmit("game-paused");
            socket.broadcast.emit("game-paused");
        }
    });

    socket.on("token", (data) => {
        game.state = { ...game.state, ...data };
        socket.broadcast.emit("established", game.state);
    });
});

io.listen(3000);
