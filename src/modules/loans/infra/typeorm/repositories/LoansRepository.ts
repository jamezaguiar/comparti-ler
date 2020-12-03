import { EntityRepository, Repository } from 'typeorm';

import Loan from '../entities/Loan';

@EntityRepository(Loan)
class LoansRepository extends Repository<Loan> {
  public async checkIfALoanHasAlreadyBeenRequested(
    requester_id: string,
    book_owner_id: string,
    book_isbn: string,
  ): Promise<Loan | null> {
    const loan = await this.findOne({
      where: {
        requester_id,
        book_owner_id,
        book_isbn,
      },
    });

    if (!loan) {
      return null;
    }

    return loan;
  }
}

export default LoansRepository;
