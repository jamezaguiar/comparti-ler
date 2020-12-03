import axios from 'axios';

export const booksAPI = axios.create({
  baseURL: 'https://api.mercadoeditorial.org/api/v1.2/book',
});
