import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  DatabaseURL: process.env.DatabaseURL,
  bycrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
};