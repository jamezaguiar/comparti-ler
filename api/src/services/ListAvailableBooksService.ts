import { getCustomRepository } from 'typeorm';

import Book from '../models/Book';
import BooksRepository from '../repositories/BooksRepository';

class ListAvailableBooksService {
  public async execute(): Promise<Book[]> {
    const booksRepository = getCustomRepository(BooksRepository);

    const books = await booksRepository.find({
      where: { borrowed: false },
      relations: ['owner'],
    });

    return books;
  }
}

export default ListAvailableBooksService;
