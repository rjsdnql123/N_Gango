import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
require('dotenv').config();

export async function jwtVerify(token: string): Promise<any> {
  const decoded: any = await jwt.verify(token, process.env.TOKEN);
  console.log(decoded);
  return decoded;
}

export function jwtSign(verify: any): string {
  return jwt.sign(
    {
      data: verify,
    },
    process.env.TOKEN,
    { expiresIn: '1h' }
  );
}
