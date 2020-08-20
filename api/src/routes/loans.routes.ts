import { Router } from 'express';

import CheckPossibleLoansService from '../services/CheckPossibleLoansService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const loansRouter = Router();

loansRouter.use(ensureAuthenticated);

loansRouter.get('/possibleLoans/:user_id', async (request, response) => {
  const { user_id } = request.params;

  const checkPossibleLoansService = new CheckPossibleLoansService();

  const test = await checkPossibleLoansService.execute(user_id);

  return response.json(test);
});

export default loansRouter;
