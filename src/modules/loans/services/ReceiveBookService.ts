import { getCustomRepository } from 'typeorm';

import Loan from '../models/Loan';
import LoansRepository from '../repositories/LoansRepository';

import AppError from '../error/AppError';
import BooksRepository from '../repositories/BooksRepository';

interface RequestDTO {
  loan_id: string;
}

class ReceiveBookService {
  public async execute({ loan_id }: RequestDTO): Promise<Loan> {
    const loansRepository = getCustomRepository(LoansRepository);
    const booksRepository = getCustomRepository(BooksRepository);

    const loan = await loansRepository.findOne({
      where: { id: loan_id },
      relations: ['book', 'book_owner', 'requester'],
    });

    if (!loan) {
      throw new AppError('Loan does not exists.');
    }

    const book = await booksRepository.findOne({
      where: { id: loan.book_id },
    });

    if (!book) {
      throw new AppError('Book does not exists.');
    }

    loan.status = 'returned';
    loan.returned_at = new Date();
    book.borrowed = false;

    await loansRepository.save(loan);
    await booksRepository.save(book);

    return loan;
  }
}

export default ReceiveBookService;
