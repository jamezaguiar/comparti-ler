import { getCustomRepository } from 'typeorm';

import Loan from '../models/Loan';
import LoansRepository from '../repositories/LoansRepository';

import AppError from '../error/AppError';

interface RequestDTO {
  loan_id: string;
}

class DeliverBookService {
  public async execute({ loan_id }: RequestDTO): Promise<Loan> {
    const loansRepository = getCustomRepository(LoansRepository);

    const loan = await loansRepository.findOne({
      where: { id: loan_id },
      relations: ['book', 'book_owner', 'requester'],
    });

    if (!loan) {
      throw new AppError('Loan does not exists.');
    }

    loan.status = 'delivered';
    loan.received_at = new Date();

    await loansRepository.save(loan);

    return loan;
  }
}

export default DeliverBookService;
