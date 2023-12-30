import { Socket } from 'socket.io';

import { User } from '../types.js';

type Connection = {
    socket: Socket;
    online: boolean;
};

export class GameConnectionManager {
    connections: Record<User, Connection> = {};

    get allConnectionsOnline() {
        return Object.values(this.connections).every(
            (connection) => connection.online,
        );
    }

    get users() {
        return Object.keys(this.connections);
    }

    addConnection(user: User, socket: Socket) {
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
