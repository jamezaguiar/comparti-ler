import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

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
