import { Router } from 'express';

import CheckPossibleLoansService from '../services/CheckPossibleLoansService';
import RequestLoanService from '../services/RequestLoanService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ListRequestedLoansService from '../services/ListRequestedLoansService';

const loansRouter = Router();

loansRouter.use(ensureAuthenticated);

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

loansRouter.get('/requestedLoans/:user_id', async (request, response) => {
  const { user_id } = request.params;

  const listRequestedLoans = new ListRequestedLoansService();

  const requestedLoans = await listRequestedLoans.execute({ user_id });

  return response.json(requestedLoans);
});

loansRouter.get('/possibleLoans/:user_id', async (request, response) => {
  const { user_id } = request.params;

  const checkPossibleLoans = new CheckPossibleLoansService();

  const possibleLoans = await checkPossibleLoans.execute(user_id);

  return response.json(possibleLoans);
});

export default loansRouter;
