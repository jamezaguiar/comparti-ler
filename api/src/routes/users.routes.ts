import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, whatsapp, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, email, whatsapp, password });
  delete user.password;

  return response.json(user);
});

export default usersRouter;
