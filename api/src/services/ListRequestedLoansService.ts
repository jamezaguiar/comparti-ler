import { getRepository } from 'typeorm';

import Loan from '../models/Loan';

interface RequestDTO {
  user_id: string;
}

class ListRequestedLoansService {
  public async execute({ user_id }: RequestDTO): Promise<Loan[]> {
    const loansRepository = getRepository(Loan);

    const loans = await loansRepository.find({
      where: { status: 'requested', book_owner_id: user_id },
      relations: ['book', 'book_owner', 'requester'],
    });

    return loans;
  }
}

export default ListRequestedLoansService;
