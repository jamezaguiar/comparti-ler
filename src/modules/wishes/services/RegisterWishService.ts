import { getCustomRepository } from 'typeorm';

import BooksRepository from '@modules/books/infra/typeorm/repositories/BooksRepository';

import Wish from '../infra/typeorm/entities/Wish';
import WishesRepository from '../infra/typeorm/repositories/WishesRepository';

interface BookData {
  isbn: string;
  title: string;
  author: string;
  synopsis: string;
  cover_url: string;
}

interface RequestDTO {
  isbn: string;
  requester_id: string;
}

interface ResponseDTO {
  wish: Wish;
  book: BookData;
}

class RegisterWishService {
  public async execute({
    isbn,
    requester_id,
  }: RequestDTO): Promise<ResponseDTO> {
    const booksRepository = getCustomRepository(BooksRepository);
    const wishesRepository = getCustomRepository(WishesRepository);

    const userAlreadyRegisteredTheWish = await wishesRepository.checkIfUserHasAlreadyRegisteredTheWish(
      isbn,
      requester_id,
    );

    if (userAlreadyRegisteredTheWish) {
      return userAlreadyRegisteredTheWish;
    }

    const wish = wishesRepository.create({
      requester_id,
      book_isbn: isbn,
    });

    await wishesRepository.save(wish);

    const bookData = await booksRepository.getBookData(isbn);

    const author = `${bookData.contribuicao[0].nome} ${bookData.contribuicao[0].sobrenome}`;
    const cover_url = bookData.imagens.imagem_primeira_capa
      ? bookData.imagens.imagem_primeira_capa.grande
      : 'https://i0.wp.com/www.guiada3aidade.com.br/wp-content/uploads/2018/10/sem-capa.jpg';

    const book = {
      isbn,
      title: bookData.titulo,
      author,
      synopsis: bookData.sinopse,
      cover_url,
    };

    return { wish, book };
  }
}

export default RegisterWishService;
