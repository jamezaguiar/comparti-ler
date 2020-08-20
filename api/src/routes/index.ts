import { Router } from 'express';

import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';
import booksRouter from './books.routes';
import wishesRouter from './wishes.routes';
import loansRouter from './loans.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/books', booksRouter);
routes.use('/wishes', wishesRouter);
routes.use('/loans', loansRouter);

export default routes;
