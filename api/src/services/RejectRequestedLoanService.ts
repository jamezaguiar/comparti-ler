import { getRepository } from 'typeorm';

import AppError from '../error/AppError';

import Loan from '../models/Loan';

interface RequestDTO {
  loan_id: string;
}

class RejectRequestedLoanService {
  public async execute({ loan_id }: RequestDTO): Promise<void> {
    const loansRepository = getRepository(Loan);

    const loan = await loansRepository.findOne({
      where: { id: loan_id, status: 'requested' },
      relations: ['book', 'book_owner', 'requester'],
    });

    if (!loan) {
      throw new AppError('Loan not found.');
    }

    loan.status = 'rejected';

    await loansRepository.save(loan);
  }
}

export default RejectRequestedLoanService;
