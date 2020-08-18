import { getCustomRepository } from 'typeorm';

import Book from '../models/Book';
import BooksRepository from '../repositories/BooksRepository';

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
