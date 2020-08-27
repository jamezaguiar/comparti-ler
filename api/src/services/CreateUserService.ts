import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

import AppError from '../error/AppError';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
  whatsapp: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    whatsapp,
  }: RequestDTO): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    if (await usersRepository.findByEmail(email)) {
      throw new AppError('Email address already used.');
    }

    if (whatsapp && (await usersRepository.findByWhatsapp(whatsapp))) {
      throw new AppError('Whatsapp number already used.');
    }

    const hashedPassword = await hash(password, 8);
    const formattedWhatsapp = `+55${whatsapp}`;

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      whatsapp: formattedWhatsapp,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
