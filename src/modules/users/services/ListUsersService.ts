import { getCustomRepository } from 'typeorm';

import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

class ListUsersService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find({
      select: ['id', 'name', 'email', 'whatsapp', 'created_at', 'updated_at'],
      relations: ['books', 'wishes'],
    });

    return users;
  }
}

export default ListUsersService;
