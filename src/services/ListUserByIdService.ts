import { getCustomRepository } from 'typeorm';

import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

import AppError from '../error/AppError';

class ListUserByIdService {
  public async execute(id: string): Promise<User | null> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'whatsapp', 'created_at', 'updated_at'],
      relations: ['books', 'wishes'],
    });

    if (!user) {
      throw new AppError('User does not exists.');
    }

    return user || null;
  }
}

export default ListUserByIdService;
