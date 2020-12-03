/* eslint-disable no-restricted-syntax */
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

interface ResponseDTO {
  wish: Wish;
  book: BookData;
}

class ListWishesService {
  public async execute(): Promise<ResponseDTO[]> {
    const booksRepository = getCustomRepository(BooksRepository);
    const wishesRepository = getCustomRepository(WishesRepository);

    const wishes = await wishesRepository.find({
      relations: ['requester'],
    });

    const formattedWishes: ResponseDTO[] = [];

    for await (const wish of wishes) {
      const bookData = await booksRepository.getBookData(wish.book_isbn);

      const author = `${bookData.contribuicao[0].nome} ${bookData.contribuicao[0].sobrenome}`;

      const book = {
        isbn: wish.book_isbn,
        title: bookData.titulo,
        author,
        synopsis: bookData.sinopse,
        cover_url: bookData.imagens.imagem_primeira_capa.grande,
      };

      formattedWishes.push({ wish, book });
    }

    return formattedWishes;
  }
}

export default ListWishesService;
