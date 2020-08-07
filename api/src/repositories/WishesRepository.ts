import { EntityRepository, Repository } from 'typeorm';

import Wish from '../models/Wish';

@EntityRepository(Wish)
class WishesRepository extends Repository<Wish> {}

export default WishesRepository;
