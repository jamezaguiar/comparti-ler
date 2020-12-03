/* eslint-disable no-restricted-syntax */
import { getCustomRepository, Not } from 'typeorm';

import Book from '@modules/books/infra/typeorm/entities/Book';

import BooksRepository from '@modules/books/infra/typeorm/repositories/BooksRepository';
import WishesRepository from '@modules/wishes/infra/typeorm/repositories/WishesRepository';

class CheckPossibleLoansService {
  public async execute(user_id: string): Promise<Book[]> {
    const wishesRepository = getCustomRepository(WishesRepository);
    const booksRepository = getCustomRepository(BooksRepository);

    const wishes = await wishesRepository.find({
      where: { requester_id: user_id },
    });

    const books: Book[] = [];

    for await (const wish of wishes) {
      const possibleBooks = await booksRepository.find({
        where: {
          owner_id: Not(user_id),
          isbn: wish.book_isbn,
          borrowed: false,
        },
      });
      possibleBooks.forEach(book => {
        books.push(book);
      });
    }

    return books;
  }
}

export default CheckPossibleLoansService;
