import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import RegisterWishService from '../services/RegisterWishService';
import ListWishesService from '../services/ListWishesService';

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

wishesRouter.get('/', async (request, response) => {
  const listWishes = new ListWishesService();

  const wishes = await listWishes.execute();
  wishes.map(wish => delete wish.wish.requester.password);

  return response.json(wishes);
});

export default wishesRouter;
