import { Router } from 'express';

import SearchBooksByTitleService from '../services/SearchBooksByTitleService';

const externalAPIRouter = Router();

externalAPIRouter.get('/searchBooksByTitle', async (request, response) => {
  const { title } = request.query as { title: string };

  const searchBooksByTitle = new SearchBooksByTitleService();

  const books = await searchBooksByTitle.execute(title);

  return response.json(books);
});

export default externalAPIRouter;
