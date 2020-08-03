import { EntityRepository, Repository } from 'typeorm';

import { booksAPI } from '../helpers/api';

import Book from '../models/Book';

@EntityRepository(Book)
class BooksRepository extends Repository<Book> {
  public async checkIfBookExists(isbn: string): Promise<boolean> {
    const findBook = await booksAPI.get(`?isbn=${isbn}`);

    return !!findBook;
  }
}

export default BooksRepository;
