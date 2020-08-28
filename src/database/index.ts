import { createConnection } from 'typeorm';

createConnection({
  url: process.env.DATABASE_URL,
});
