import { Server } from "socket.io";
import { logEmit, shortenId } from "../utils.js";
import { Game } from "./Game.js";

export function createGameServer(io: Server) {
    const game = new Game();

    io.on("connection", async (socket) => {
        const user = shortenId(socket.handshake.auth.user);

        console.warn(`User ${user} connected by socket ${socket.id} `);

        if (!game.ready) {
            game.addOrReconnectPlayer(user, socket);
        }

        if (game.ready) {
            if (!game.inProgress) {
                game.start();
            }

            logEmit("game-ready");
            io.emit("game-ready", game.state);
            socket.emit("init-player", game.players[user].clientData);
        }

        socket.on("end-turn", (data) => {
            game.endUserTurn(user, data);

            socket.emit("player", game.players[user].clientData);
            socket.broadcast.emit(
                "player",
                game.getOpponentPlayer(user).clientData
            );

            io.emit("established", game.state);
        });

        socket.on("disconnect", () => {
            console.warn(`User ${user} disconnected`);
            game.connectionManager.disconnect(user);
            if (!game.ready) {
                logEmit("game-paused");
                socket.broadcast.emit("game-paused");
            }
        });
    });
}
