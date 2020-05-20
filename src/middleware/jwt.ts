import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
require('dotenv').config();

export default async function(req: Request, res: Response, next: NextFunction) {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(404).send({ error: { message: 'Login require' } });
    }
    const decoded = await jwt.verify(token, process.env.TOKEN);
    console.log(decoded);
    // req.verify = decoded.valueOf();
    next();
  } catch (err) {
    return res.status(500).send({ error: { message: 'server error' } });
  }
}

export function jwtSign(verify: any): string {
  return jwt.sign(
    {
      exp: 60 * 60,
      data: verify,
    },
    process.env.TOKEN
  );
}
