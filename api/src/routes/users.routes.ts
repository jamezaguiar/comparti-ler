import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';
import ListUsersService from '../services/ListUsersService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, whatsapp, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, email, whatsapp, password });
  delete user.password;

  return response.json(user);
});

usersRouter.get('/list', async (request, response) => {
  const listUsers = new ListUsersService();

  const users = await listUsers.execute();

  return response.json(users);
});

export default usersRouter;
