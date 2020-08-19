import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import RegisterWishService from '../services/RegisterWishService';
import ListWishesService from '../services/ListWishesService';
import ListUserWishesService from '../services/ListUserWishesService';

const wishesRouter = Router();

wishesRouter.use(ensureAuthenticated);

wishesRouter.post('/', async (request, response) => {
  const { isbn } = request.body;

  const registerWish = new RegisterWishService();

  const wish = await registerWish.execute({
    isbn,
    requester_id: request.user.id,
  });

  return response.json(wish);
});

wishesRouter.get('/list/:requester_id', async (request, response) => {
  const { requester_id } = request.params;

  const listUserWishes = new ListUserWishesService();

  const wishes = await listUserWishes.execute(requester_id);

  return response.json(wishes);
});

wishesRouter.get('/listAll', async (request, response) => {
  const listWishes = new ListWishesService();

  const wishes = await listWishes.execute();
  wishes.map(wish => delete wish.wish.requester.password);

  return response.json(wishes);
});

export default wishesRouter;
