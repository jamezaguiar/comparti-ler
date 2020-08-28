import * as dotenv from 'dotenv';

dotenv.config();
const path = `${__dirname}/../../.env`;

dotenv.config({ path });

export const { AUTH_SECRET } = process.env;
export const { TOKEN_EXPIRATION_TIME } = process.env;
export const { DATABASE_URL } = process.env;
