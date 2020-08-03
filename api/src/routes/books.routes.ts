import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import RegisterBookService from '../services/RegisterBookService';

const booksRouter = Router();

booksRouter.use(ensureAuthenticated);

booksRouter.post('/', async (request, response) => {
  const { isbn } = request.body;

  const registerBookService = new RegisterBookService();

  const book = await registerBookService.execute({
    isbn,
    owner_id: request.user.id,
  });

  return response.json(book);
});

export default booksRouter;
