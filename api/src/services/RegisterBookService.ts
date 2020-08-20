import { getCustomRepository } from 'typeorm';

import Book from '../models/Book';
import BooksRepository from '../repositories/BooksRepository';

import AppError from '../error/AppError';
import SendPossibleLoansService from './SendPossibleLoansService';

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

    const userAlreadyHasTheBook = await booksRepository.checkIfUserAlreadyHasTheBook(
      isbn,
      owner_id,
    );

    if (userAlreadyHasTheBook) {
      return userAlreadyHasTheBook;
    }

    const {
      titulo,
      contribuicao,
      sinopse,
      imagens,
    } = await booksRepository.getBookData(isbn);

    const author = `${contribuicao[0].nome} ${contribuicao[0].sobrenome}`;
    const cover_url = imagens.imagem_primeira_capa
      ? imagens.imagem_primeira_capa.grande
      : 'https://i0.wp.com/www.guiada3aidade.com.br/wp-content/uploads/2018/10/sem-capa.jpg';

    const book = booksRepository.create({
      isbn,
      owner_id,
      title: titulo,
      author,
      synopsis: sinopse,
      cover_url,
    });

    await booksRepository.save(book);

    const sendPossibleLoans = new SendPossibleLoansService();

    sendPossibleLoans.execute({});

    return book;
  }
}

export default RegisterBookService;
