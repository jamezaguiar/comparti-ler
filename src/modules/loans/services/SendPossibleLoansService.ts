/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { io } from '../app';
import { connectedUsers } from '../server';

import CheckPossibleLoansService from './CheckPossibleLoansService';

interface RequestDTO {
  socket_id?: string;
  user_id?: string;
}

class SendPossibleLoansService {
  public async execute({ socket_id, user_id }: RequestDTO): Promise<void> {
    const checkPossibleLoansService = new CheckPossibleLoansService();

    if (user_id && socket_id) {
      const possibleLoans = await checkPossibleLoansService.execute(user_id);

      io.to(socket_id).emit('check_possible_loans', possibleLoans);
      return;
    }

    for (const user in connectedUsers) {
      const possibleLoans = await checkPossibleLoansService.execute(
        connectedUsers[user],
      );
      io.to(user).emit('check_possible_loans', possibleLoans);
    }
  }
}

export default SendPossibleLoansService;
