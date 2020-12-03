import { Router } from 'express';

import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

import booksRouter from '@modules/books/infra/http/routes/books.routes';
import loansRouter from '@modules/loans/infra/http/routes/loans.routes';
import wishesRouter from '@modules/wishes/infra/http/routes/wishes.routes';
import externalAPIRouter from '@modules/books/infra/http/routes/externalAPI.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/books', booksRouter);
routes.use('/wishes', wishesRouter);
routes.use('/loans', loansRouter);
routes.use('/externalAPI', externalAPIRouter);

export default routes;
