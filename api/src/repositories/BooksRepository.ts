import { EntityRepository, Repository } from 'typeorm';

import { booksAPI } from '../helpers/api';

import Book from '../models/Book';

interface RequestDTO {
  isbn: string;
}

interface ResponseDTO {
  success: boolean;
  code: number;
  message?: string;
}

interface APIResponseDTO {
  status: {
    success: boolean;
    code: number;
    message?: string;
  };
}

@EntityRepository(Book)
class BooksRepository extends Repository<Book> {
  public async checkIfBookExists({ isbn }: RequestDTO): Promise<ResponseDTO> {
    const {
      data: { status },
    } = await booksAPI.get<APIResponseDTO>(`?isbn=${isbn}`);

    return status;
  }
}

export default BooksRepository;
