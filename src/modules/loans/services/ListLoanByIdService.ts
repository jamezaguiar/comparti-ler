import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Loan from '../infra/typeorm/entities/Loan';

interface RequestDTO {
  loan_id: string;
}

class ListLoanByIdService {
  public async execute({ loan_id }: RequestDTO): Promise<Loan> {
    const loansRepository = getRepository(Loan);

    const loan = await loansRepository.findOne({
      where: { id: loan_id },
      relations: ['book', 'book_owner', 'requester'],
    });

    if (!loan) {
      throw new AppError('Loan not found.');
    }

    return loan;
  }
}

export default ListLoanByIdService;
