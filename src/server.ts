import { Socket } from 'socket.io';
import { server, io } from './app';

import SendPossibleLoansService from './services/SendPossibleLoansService';

const PORT = process.env.PORT || 3333;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

interface ConnectedUsers {
  [socket_id: string]: string;
}

export const connectedUsers: ConnectedUsers = {};

io.on('connection', async (socket: Socket) => {
  const { name, id } = socket.handshake.query;
  console.log(`Usuário ${name} de ID ${id} conectado.`);

  connectedUsers[socket.id] = id;

  const sendPossibleLoans = new SendPossibleLoansService();

  sendPossibleLoans.execute({ socket_id: socket.id, user_id: id });

  socket.on('disconnect', () => {
    console.log(`Usuário ${name} de ID ${id} desconectado.`);
    delete connectedUsers[id];
  });
});
