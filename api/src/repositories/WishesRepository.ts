import { EntityRepository, Repository } from 'typeorm';

import Wish from '../models/Wish';

import { booksAPI } from '../helpers/api';

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

@EntityRepository(Wish)
class WishesRepository extends Repository<Wish> {
  public async findBookData(isbn: string): Promise<BookDataDTO> {
    const response = await booksAPI.get<APIResponseDTO>(`?isbn=${isbn}`);

    const { titulo } = response.data.books[0];
    const { contribuicao } = response.data.books[0];
    const { sinopse } = response.data.books[0];
    const { imagens } = response.data.books[0];

    const bookData: BookDataDTO = { titulo, contribuicao, sinopse, imagens };

    return bookData;
  }
}

export default WishesRepository;
