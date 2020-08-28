import { getCustomRepository } from 'typeorm';

import Book from '../models/Book';
import BooksRepository from '../repositories/BooksRepository';

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
