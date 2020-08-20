/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { Socket } from 'socket.io';
import { server, io } from './app';
import CheckPossibleLoansService from './services/CheckPossibleLoansService';

const PORT = process.env.PORT || 3333;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

interface ConnectedUsers {
  [socket_id: string]: string;
}

const connectedUsers: ConnectedUsers = {};

io.on('connection', async (socket: Socket) => {
  const { name, id } = socket.handshake.query;
  console.log(`Usuário ${name} de ID ${id} conectado.`);

  connectedUsers[socket.id] = id;

  const checkPossibleLoansService = new CheckPossibleLoansService();

  const possibleLoans = await checkPossibleLoansService.execute(id);

  for (const user in connectedUsers) {
    io.to(user).emit('check_possible_loans', possibleLoans);
    console.log(user);
  }

  socket.on('disconnect', () => {
    console.log(`Usuário ${name} de ID ${id} desconectado.`);
    delete connectedUsers[id];
  });
});
