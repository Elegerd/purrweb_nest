import { config } from 'dotenv';

config();

export const { JWT_SECRET, MAILER_EMAIL, MAILER_PASSWORD } = process.env;
