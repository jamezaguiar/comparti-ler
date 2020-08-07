import { getCustomRepository } from 'typeorm';

import WishesRepository from '../repositories/WishesRepository';
import Wish from '../models/Wish';
import BooksRepository from '../repositories/BooksRepository';

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

    const wish = wishesRepository.create({
      requester_id,
      book_isbn: isbn,
    });

    await wishesRepository.save(wish);

    const bookData = await booksRepository.getBookData(isbn);

    const author = `${bookData.contribuicao[0].nome} ${bookData.contribuicao[0].sobrenome}`;

    const book = {
      isbn,
      title: bookData.titulo,
      author,
      synopsis: bookData.sinopse,
      cover_url: bookData.imagens.imagem_primeira_capa.grande,
    };

    return { wish, book };
  }
}

export default RegisterWishService;
