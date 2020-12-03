import { EntityRepository, Repository } from 'typeorm';

import { booksAPI } from '@shared/helpers/api';

import Book from '@modules/books/infra/typeorm/entities/Book';

interface BookStatusDTO {
  success: boolean;
  code: number;
  message?: string;
}

interface BookDataDTO {
  titulo: string;
  contribuicao: [
    {
      nome: string;
      sobrenome: string;
      tipo_de_contribuicao: string;
      codigo_contribuicao: string;
    },
  ];
  sinopse: string;
  imagens: {
    imagem_primeira_capa: {
      pequena: string;
      media: string;
      grande: string;
    };
  };
}

interface APIResponseDTO {
  books: BookDataDTO[];
  status: BookStatusDTO;
}

@EntityRepository(Book)
class BooksRepository extends Repository<Book> {
  public async checkIfBookExists(isbn: string): Promise<BookStatusDTO> {
    const {
      data: { status },
    } = await booksAPI.get<APIResponseDTO>(`?isbn=${isbn}`);

    return status;
  }

  public async checkIfBookIsBorrowed(
    owner_id: string,
    isbn: string,
  ): Promise<boolean> {
    const book = await this.findOne({
      where: {
        owner_id,
        isbn,
        borrowed: true,
      },
    });

    return !!book;
  }

  public async checkIfUserAlreadyHasTheBook(
    isbn: string,
    user_id: string,
  ): Promise<Book | null> {
    const book = await this.findOne({ where: { isbn, owner_id: user_id } });

    if (book) {
      return book;
    }

    return null;
  }

  public async getBookData(isbn: string): Promise<BookDataDTO> {
    const response = await booksAPI.get<APIResponseDTO>(`?isbn=${isbn}`);

    const { titulo } = response.data.books[0];
    const { contribuicao } = response.data.books[0];
    const { sinopse } = response.data.books[0];
    const { imagens } = response.data.books[0];

    const bookData: BookDataDTO = { titulo, contribuicao, sinopse, imagens };

    return bookData;
  }
}

export default BooksRepository;
