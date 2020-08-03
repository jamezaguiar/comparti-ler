import { Router } from 'express';

import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';
import booksRouter from './books.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/books', booksRouter);

export default routes;
