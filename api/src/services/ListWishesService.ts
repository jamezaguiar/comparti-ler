/* eslint-disable no-restricted-syntax */
import { getCustomRepository } from 'typeorm';

import Wish from '../models/Wish';

import WishesRepository from '../repositories/WishesRepository';

interface BookData {
  isbn: string;
  title: string;
  author: string;
  synopsis: string;
  cover_url: string;
}

interface WishData {
  wish: Wish;
  bookData: BookData;
}

class ListWishesService {
  public async execute(): Promise<WishData[]> {
    const wishesRepository = getCustomRepository(WishesRepository);

    const wishes = await wishesRepository.find({
      relations: ['requester'],
    });

    const formattedWishes: WishData[] = [];

    for await (const wish of wishes) {
      const bookData = await wishesRepository.findBookData(wish.book_isbn);

      const author = `${bookData.contribuicao[0].nome} ${bookData.contribuicao[0].sobrenome}`;

      const book = {
        isbn: wish.book_isbn,
        title: bookData.titulo,
        author,
        synopsis: bookData.sinopse,
        cover_url: bookData.imagens.imagem_primeira_capa.grande,
      };

      formattedWishes.push({ wish, bookData: book });
    }

    return formattedWishes;
  }
}

export default ListWishesService;
