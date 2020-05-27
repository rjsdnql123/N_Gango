import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
require('dotenv').config();

export async function jwtVerify(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  try {
    const { token }: any = req.query;
    if (!token) {
      return res.status(404).send({ error: { message: 'Login require' } });
    }
    const decoded: any = await jwt.verify(token, process.env.TOKEN);
    req.body.data = decoded.data;
    next();
  } catch (error) {
    console.log('jwt error', error);
    return res.status(500).send('server error');
  }
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
