import { getCustomRepository, Not } from 'typeorm';

import Book from '../infra/typeorm/entities/Book';
import BooksRepository from '../infra/typeorm/repositories/BooksRepository';

interface RequestDTO {
  user_id: string;
}

class ListAvailableBooksService {
  public async execute({ user_id }: RequestDTO): Promise<Book[]> {
    const booksRepository = getCustomRepository(BooksRepository);

    const books = await booksRepository.find({
      where: { borrowed: false, owner_id: Not(user_id) },
      relations: ['owner'],
    });

    return books;
  }
}

export default ListAvailableBooksService;
