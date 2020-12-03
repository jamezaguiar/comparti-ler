import { getCustomRepository } from 'typeorm';

import Book from '../infra/typeorm/entities/Book';
import BooksRepository from '../infra/typeorm/repositories/BooksRepository';

class ListUserBooksService {
  public async execute(owner_id: string): Promise<Book[]> {
    const booksRepository = getCustomRepository(BooksRepository);

    const books = await booksRepository.find({
      where: { owner_id },
    });

    return books;
  }
}

export default ListUserBooksService;
