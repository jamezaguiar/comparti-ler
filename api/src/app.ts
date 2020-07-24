import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);

const server = http.createServer(app);
const io = socketio(server);

export { server, io };
