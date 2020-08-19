import { Socket } from 'socket.io';
import { server, io } from './app';

const PORT = process.env.PORT || 3333;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

io.on('connection', (socket: Socket) => {
  const { name, id } = socket.handshake.query;
  console.log(`Usuário ${name} de ID ${id} conectado.`);
});
