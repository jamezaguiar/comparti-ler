import { getRepository, getCustomRepository } from 'typeorm';

import AppError from '../error/AppError';

import Loan from '../models/Loan';

import BooksRepository from '../repositories/BooksRepository';

interface RequestDTO {
  loan_id: string;
}

class AcceptRequestedLoanService {
  public async execute({ loan_id }: RequestDTO): Promise<Loan> {
    const booksRepository = getCustomRepository(BooksRepository);
    const loansRepository = getRepository(Loan);

    const loan = await loansRepository.findOne({
      where: { id: loan_id, status: 'requested' },
      relations: ['book', 'book_owner', 'requester'],
    });

    if (!loan) {
      throw new AppError('Loan not found.');
    }

    const book = await booksRepository.findOne({
      where: { id: loan.book_id, borrowed: false },
    });

    if (!book) {
      throw new AppError('Book not found.');
    }

    loan.status = 'accepted';
    book.borrowed = true;

    await loansRepository.save(loan);
    await booksRepository.save(book);

    return loan;
  }
}

export default AcceptRequestedLoanService;
