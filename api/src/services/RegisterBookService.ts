import { getCustomRepository } from 'typeorm';

import Book from '../models/Book';
import BooksRepository from '../repositories/BooksRepository';

import AppError from '../error/AppError';

interface RequestDTO {
  isbn: string;
  owner_id: string;
}

class RegisterBookService {
  public async execute({ isbn, owner_id }: RequestDTO): Promise<Book> {
    const booksRepository = getCustomRepository(BooksRepository);

    const { success } = await booksRepository.checkIfBookExists(isbn);

    if (!success) {
      throw new AppError('ISBN not found.');
    }

    const { titulo, contribuicao, imagens } = await booksRepository.getBookData(
      isbn,
    );

    const author = `${contribuicao[0].nome} ${contribuicao[0].sobrenome}`;

    const book = booksRepository.create({
      isbn,
      owner_id,
      title: titulo,
      author,
      cover_url: imagens.imagem_primeira_capa.grande,
    });

    await booksRepository.save(book);

    return book;
  }
}

export default RegisterBookService;
