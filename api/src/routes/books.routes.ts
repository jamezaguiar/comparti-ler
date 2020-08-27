import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import RegisterBookService from '../services/RegisterBookService';

import ListUserBooksService from '../services/ListUserBooksService';
import ListBooksService from '../services/ListBooksService';
import ListAvailableBooksService from '../services/ListAvailableBooksService';

const booksRouter = Router();

booksRouter.use(ensureAuthenticated);

booksRouter.post('/register', async (request, response) => {
  const { isbn } = request.body;

  const registerBook = new RegisterBookService();

  const book = await registerBook.execute({
    isbn,
    owner_id: request.user.id,
  });

  return response.json(book);
});

booksRouter.get('/list/:owner_id', async (request, response) => {
  const { owner_id } = request.params;

  const listUserBooks = new ListUserBooksService();

  const books = await listUserBooks.execute(owner_id);

  return response.json(books);
});

booksRouter.get('/listAll', async (request, response) => {
  const listBooks = new ListBooksService();

  const books = await listBooks.execute();
  books.forEach(book => {
    delete book.owner.password;
  });

  return response.json(books);
});

booksRouter.get('/listAvailable', async (request, response) => {
  const listAvailableBooks = new ListAvailableBooksService();

  const books = await listAvailableBooks.execute();
  books.forEach(book => {
    delete book.owner.password;
  });

  return response.json(books);
});

export default booksRouter;
