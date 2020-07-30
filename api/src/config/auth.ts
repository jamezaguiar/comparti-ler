import { AUTH_SECRET, TOKEN_EXPIRATION_TIME } from '../utils/environment';

export default {
  jwt: {
    secret: AUTH_SECRET,
    expiresIn: TOKEN_EXPIRATION_TIME,
  },
};
