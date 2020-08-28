import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import SearchBookByISBNService from '../services/SearchBookByISBNService';
import SearchBooksByTitleService from '../services/SearchBooksByTitleService';

const externalAPIRouter = Router();

externalAPIRouter.use(ensureAuthenticated);

externalAPIRouter.get('/searchBookByISBN', async (request, response) => {
  const { isbn } = request.query as { isbn: string };

  const searchBookByISBN = new SearchBookByISBNService();

  const book = await searchBookByISBN.execute(isbn);

  return response.json(book);
});

externalAPIRouter.get('/searchBooksByTitle', async (request, response) => {
  const { title } = request.query as { title: string };

  const searchBooksByTitle = new SearchBooksByTitleService();

  const books = await searchBooksByTitle.execute(title);

  return response.json(books);
});

export default externalAPIRouter;
