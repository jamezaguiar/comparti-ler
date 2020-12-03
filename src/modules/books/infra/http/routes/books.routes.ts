import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import RegisterBookService from '@modules/books/services/RegisterBookService';

import ListUserBooksService from '@modules/books/services/ListUserBooksService';
import ListBooksService from '@modules/books/services/ListBooksService';
import ListAvailableBooksService from '@modules/books/services/ListAvailableBooksService';

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

booksRouter.get('/listAvailable/:user_id', async (request, response) => {
  const { user_id } = request.params;

  const listAvailableBooks = new ListAvailableBooksService();

  const books = await listAvailableBooks.execute({ user_id });
  books.forEach(book => {
    delete book.owner.password;
  });

  return response.json(books);
});

export default booksRouter;
