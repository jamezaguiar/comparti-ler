import { getRepository } from 'typeorm';

import Book from '../models/Book';

import AppError from '../error/AppError';

interface RequestDTO {
  isbn: string;
}

class RegisterBookService {
  public async execute({ isbn }: RequestDTO): Promise<Book> {
    const booksRepository = getRepository(Book);
  }
}

export default RegisterBookService;
