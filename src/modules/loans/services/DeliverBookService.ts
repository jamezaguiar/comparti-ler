import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Loan from '../infra/typeorm/entities/Loan';
import LoansRepository from '../infra/typeorm/repositories/LoansRepository';

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
