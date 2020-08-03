import axios from 'axios';

export const booksAPI = axios.create({
  baseURL: 'https://sandbox.mercadoeditorial.org/api/v1.2/book',
});
