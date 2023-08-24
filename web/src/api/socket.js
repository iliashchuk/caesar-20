import { io } from 'socket.io-client';

function makeSocket(options) {
    const socket = io('https://all-dolls-report.loca.lt', options);

    socket.on('connect', () => {
        console.log('Socket connected');
    });

    socket.on('connect', () => {
        console.log('Socket disconnected');
    });

    return socket;
}

export { makeSocket };
