import { EntityRepository, Repository, getCustomRepository } from 'typeorm';

import Wish from '../models/Wish';
import BooksRepository from './BooksRepository';

interface BookData {
  isbn: string;
  title: string;
  author: string;
  synopsis: string;
  cover_url: string;
}

interface WishData {
  wish: Wish;
  book: BookData;
}

@EntityRepository(Wish)
class WishesRepository extends Repository<Wish> {
  public async checkIfUserHasAlreadyRegisteredTheWish(
    book_isbn: string,
    requester_id: string,
  ): Promise<WishData | null> {
    const wish = await this.findOne({ where: { book_isbn, requester_id } });

    if (wish) {
      const booksRepository = getCustomRepository(BooksRepository);
      const bookData = await booksRepository.getBookData(wish.book_isbn);

      const author = `${bookData.contribuicao[0].nome} ${bookData.contribuicao[0].sobrenome}`;

      const book = {
        isbn: wish.book_isbn,
        title: bookData.titulo,
        author,
        synopsis: bookData.sinopse,
        cover_url: bookData.imagens.imagem_primeira_capa.grande,
      };

      return { wish, book };
    }

    return null;
  }
}

export default WishesRepository;
