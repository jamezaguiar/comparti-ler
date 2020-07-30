import { EntityRepository, Repository } from 'typeorm';

import User from '../models/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findByEmail(email: string): Promise<User | null> {
    const findUser = await this.findOne({ where: { email } });

    return findUser || null;
  }

  public async findByWhatsapp(whatsapp: string): Promise<User | null> {
    const findUser = await this.findOne({ where: { whatsapp } });

    return findUser || null;
  }
}

export default UsersRepository;
