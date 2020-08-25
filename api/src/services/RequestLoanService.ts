import { getRepository, getCustomRepository } from 'typeorm';

import AppError from '../error/AppError';

import Loan from '../models/Loan';

import BooksRepository from '../repositories/BooksRepository';

interface BookData {
  isbn: string;
  title: string;
  author: string;
  synopsis: string;
  cover_url: string;
}

interface RequestDTO {
  requester_id: string;
  book_owner_id: string;
  book_isbn: string;
}

interface ResponseDTO {
  loan: Loan;
  book: BookData;
}

class RequestLoanService {
  public async execute({
    requester_id,
    book_owner_id,
    book_isbn,
  }: RequestDTO): Promise<ResponseDTO> {
    const booksRepository = getCustomRepository(BooksRepository);
    const loansRepository = getRepository(Loan);

    const isBorrowed = await booksRepository.checkIfBookIsBorrowed(
      book_owner_id,
      book_isbn,
    );

    if (isBorrowed) {
      throw new AppError('Book is already borrowed.');
    }

    const userHasTheBook = await booksRepository.checkIfUserAlreadyHasTheBook(
      book_isbn,
      book_owner_id,
    );

    if (!userHasTheBook) {
      throw new AppError(`User ${book_owner_id} doesn't have this book.`);
    }

    const loan = loansRepository.create({
      book_isbn,
      book_owner_id,
      book_id: userHasTheBook.id,
      requester_id,
      status: 'requested',
    });

    await loansRepository.save(loan);

    const bookData = await booksRepository.getBookData(book_isbn);

    const author = `${bookData.contribuicao[0].nome} ${bookData.contribuicao[0].sobrenome}`;
    const cover_url = bookData.imagens.imagem_primeira_capa
      ? bookData.imagens.imagem_primeira_capa.grande
      : 'https://i0.wp.com/www.guiada3aidade.com.br/wp-content/uploads/2018/10/sem-capa.jpg';

    const book = {
      isbn: book_isbn,
      title: bookData.titulo,
      author,
      synopsis: bookData.sinopse,
      cover_url,
    };

    return { loan, book };
  }
}

export default RequestLoanService;
