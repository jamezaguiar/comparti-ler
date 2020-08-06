import { EntityRepository, Repository } from 'typeorm';

import { booksAPI } from '../helpers/api';

import Book from '../models/Book';

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

  public async getBookData(isbn: string): Promise<BookDataDTO> {
    const response = await booksAPI.get<APIResponseDTO>(`?isbn=${isbn}`);

    const { titulo } = response.data.books[0];
    const { contribuicao } = response.data.books[0];
    const { imagens } = response.data.books[0];

    const bookData: BookDataDTO = { titulo, contribuicao, imagens };

    return bookData;
  }

  public async verifyIfUserHasTheBook(
    isbn: string,
    owner_id: string,
  ): Promise<Book | null> {
    const book = await this.findOne({ where: { owner_id, isbn } });

    return book || null;
  }
}

export default BooksRepository;
