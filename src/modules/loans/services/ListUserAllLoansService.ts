import { getCustomRepository } from 'typeorm';

import Loan from '../infra/typeorm/entities/Loan';
import LoansRepository from '../infra/typeorm/repositories/LoansRepository';

interface RequestDTO {
  user_id: string;
}

interface ResponseDTO {
  loansByUser: Loan[];
  loansForUser: Loan[];
}

class ListUserAllLoansService {
  public async execute({ user_id }: RequestDTO): Promise<ResponseDTO> {
    const loansRepository = getCustomRepository(LoansRepository);

    const loansByUser = await loansRepository.find({
      where: { requester_id: user_id },
      relations: ['book', 'book_owner', 'requester'],
    });
    const loansForUser = await loansRepository.find({
      where: { book_owner_id: user_id },
      relations: ['book', 'book_owner', 'requester'],
    });

    const loans = {
      loansByUser,
      loansForUser,
    };

    return loans;
  }
}

export default ListUserAllLoansService;
