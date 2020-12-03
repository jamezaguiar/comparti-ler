import { getCustomRepository } from 'typeorm';

import Book from '../infra/typeorm/entities/Book';
import BooksRepository from '../infra/typeorm/repositories/BooksRepository';

class ListBooksService {
  public async execute(): Promise<Book[]> {
    const booksRepository = getCustomRepository(BooksRepository);

    const books = await booksRepository.find({
      relations: ['owner'],
    });

    return books;
  }
}

export default ListBooksService;
