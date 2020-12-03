import { Router } from 'express';

import CheckPossibleLoansService from '@modules/loans/services/CheckPossibleLoansService';
import RequestLoanService from '@modules/loans/services/RequestLoanService';

import ListRequestedLoansService from '@modules/loans/services/ListRequestedLoansService';
import AcceptRequestedLoanService from '@modules/loans/services/AcceptRequestedLoanService';
import RejectRequestedLoanService from '@modules/loans/services/RejectRequestedLoanService';

import ListLoanByIdService from '@modules/loans/services/ListLoanByIdService';
import ListUserLoansService from '@modules/loans/services/ListUserLoansService';
import ListUserLoansRequestsService from '@modules/loans/services/ListUserLoansRequestsService';

import DeliverBookService from '@modules/loans/services/DeliverBookService';
import ReceiveBookService from '@modules/loans/services/ReceiveBookService';
import ListUserAllLoansService from '@modules/loans/services/ListUserAllLoansService';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

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

loansRouter.get('/listUserLoans/:user_id', async (request, response) => {
  const { user_id } = request.params;

  const listUserLoans = new ListUserLoansService();

  const loans = await listUserLoans.execute({ user_id });
  loans.forEach(loan => {
    delete loan.requester.password;
    delete loan.book_owner.password;
  });

  return response.json(loans);
});

loansRouter.get(
  '/listUserRequestedLoans/:user_id',
  async (request, response) => {
    const { user_id } = request.params;

    const listUserLoansRequests = new ListUserLoansRequestsService();

    const loans = await listUserLoansRequests.execute({ user_id });
    loans.forEach(loan => {
      delete loan.requester.password;
      delete loan.book_owner.password;
    });

    return response.json(loans);
  },
);

loansRouter.get('/listUserAllLoans/:user_id', async (request, response) => {
  const { user_id } = request.params;

  const listUserAllLoans = new ListUserAllLoansService();

  const loans = await listUserAllLoans.execute({ user_id });

  return response.json(loans);
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

loansRouter.put('/deliverBook/:loan_id', async (request, response) => {
  const { loan_id } = request.params;

  const deliverBook = new DeliverBookService();

  const loan = await deliverBook.execute({ loan_id });

  return response.json(loan);
});
loansRouter.put('/receiveBook/:loan_id', async (request, response) => {
  const { loan_id } = request.params;

  const receiveBook = new ReceiveBookService();

  const loan = await receiveBook.execute({ loan_id });

  return response.json(loan);
});

export default loansRouter;
