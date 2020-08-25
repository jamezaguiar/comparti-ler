import { getRepository } from 'typeorm';

import AppError from '../error/AppError';

import Loan from '../models/Loan';

interface RequestDTO {
  loan_id: string;
}

class AcceptRequestedLoanService {
  public async execute({ loan_id }: RequestDTO): Promise<Loan> {
    const loansRepository = getRepository(Loan);

    const loan = await loansRepository.findOne({
      where: { id: loan_id, status: 'requested' },
      relations: ['book', 'book_owner', 'requester'],
    });

    if (!loan) {
      throw new AppError('Loan not found.');
    }

    loan.status = 'accepted';

    await loansRepository.save(loan);

    return loan;
  }
}

export default AcceptRequestedLoanService;
