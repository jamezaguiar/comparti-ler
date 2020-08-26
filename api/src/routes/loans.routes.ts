import { Router } from 'express';

import CheckPossibleLoansService from '../services/CheckPossibleLoansService';
import RequestLoanService from '../services/RequestLoanService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ListRequestedLoansService from '../services/ListRequestedLoansService';
import AcceptRequestedLoanService from '../services/AcceptRequestedLoanService';
import RejectRequestedLoanService from '../services/RejectRequestedLoanService';
import ListLoanByIdService from '../services/ListLoanByIdService';

const loansRouter = Router();

loansRouter.use(ensureAuthenticated);

loansRouter.get('/requestedLoans/:user_id', async (request, response) => {
  const { user_id } = request.params;

  const listRequestedLoans = new ListRequestedLoansService();

  const requestedLoans = await listRequestedLoans.execute({ user_id });
  requestedLoans.forEach(requestedLoan => {
    delete requestedLoan.requester.password;
    delete requestedLoan.book_owner.password;
  });

  return response.json(requestedLoans);
});

loansRouter.get('/possibleLoans/:user_id', async (request, response) => {
  const { user_id } = request.params;

  const checkPossibleLoans = new CheckPossibleLoansService();

  const possibleLoans = await checkPossibleLoans.execute(user_id);

  return response.json(possibleLoans);
});

loansRouter.get('/list/:id', async (request, response) => {
  const { id } = request.params;

  const listLoanById = new ListLoanByIdService();

  const loan = await listLoanById.execute({ loan_id: id });
  delete loan.requester.password;
  delete loan.book_owner.password;

  return response.json(loan);
});

loansRouter.post('/request', async (request, response) => {
  const { book_isbn, book_owner_id, requester_id } = request.body;

  const requestLoanService = new RequestLoanService();

  const requestedLoan = await requestLoanService.execute({
    book_isbn,
    book_owner_id,
    requester_id,
  });

  return response.json(requestedLoan);
});

loansRouter.put('/acceptLoan/:loan_id', async (request, response) => {
  const { loan_id } = request.params;

  const acceptRequestedLoan = new AcceptRequestedLoanService();

  const loan = await acceptRequestedLoan.execute({ loan_id });
  delete loan.requester.password;
  delete loan.book_owner.password;

  return response.json(loan);
});

loansRouter.put('/rejectLoan/:loan_id', async (request, response) => {
  const { loan_id } = request.params;

  const rejectRequestedLoan = new RejectRequestedLoanService();

  await rejectRequestedLoan.execute({ loan_id });

  return response.json({ message: 'Loan request rejected' });
});

export default loansRouter;
