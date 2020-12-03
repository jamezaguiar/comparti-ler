import { booksAPI } from '@shared/helpers/api';

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

class SearchBookByISBNService {
  public async execute(isbn: string): Promise<APIResponseDTO> {
    const response = await booksAPI.get<APIResponseDTO>(`?isbn=${isbn}`);

    return response.data;
  }
}

export default SearchBookByISBNService;
