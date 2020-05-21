import * as crypto from 'crypto';
require('dotenv').config();

export function hashing(password: string): string {
  const hash = crypto
    .createHmac('sha1', process.env.SALT)
    .update(password)
    .digest('hex');
  return hash;
}
