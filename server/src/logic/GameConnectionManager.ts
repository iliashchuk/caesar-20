import { Socket } from "socket.io";

type Connection = {
    socket: Socket;
    online: boolean;
};

export class GameConnectionManager {
    connections: Record<string, Connection> = {};

    get allConnectionsOnline() {
        return Object.values(this.connections).every(
            (connection) => connection.online
        );
    }

    get users() {
        return Object.keys(this.connections);
    }

    addConnection(user: string, socket: Socket) {
        this.connections[user] = { socket, online: true };
    }

    disconnect(user) {
        this.connections[user].online = false;
    }

    reconnect(user, socket) {
        this.connections[user].online = true;
        this.connections[user].socket = socket;
    }
}
