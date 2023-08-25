import { io } from 'socket.io-client';

function makeSocket(options) {
    const socket = io('http://localhost:3000', options);

    socket.on('connect', () => {
        console.log('Socket connected');
    });

    socket.on('connect', () => {
        console.log('Socket disconnected');
    });

    return socket;
}

export { makeSocket };
