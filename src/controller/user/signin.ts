import { Request, Response } from 'express';
import sequelize from '../../models';
import { jwtSign } from '../../middleware/jwt';
import { hashing } from '../../helper/crypto';
const { Users } = sequelize;

const signin = async function(req: Request, res: Response) {
  try {
    console.log(req.body.email);
    const user = await Users.findOne({
      where: {
        email: req.body.email,
        password: hashing(req.body.password),
      },
    }).then((result): any => {
      if (!result) {
        res.status(401).send({ error: { message: 'Bad Authentication data' } });
      }
      return result;
    });
    if (user) {
      const token = jwtSign(user.id);
      res.status(201).send({ token: token });
    }
  } catch (error) {
    res.status(500).send({ error: { message: 'server err' } });
  }
};

module.exports = signin;
