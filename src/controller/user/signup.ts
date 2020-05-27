import { Request, Response } from 'express';
import sequelize from '../../models';
const { Users } = sequelize;

const signup = async function(req: Request, res: Response) {
  try {
    console.log(req.body);
    await Users.findOrCreate({
      where: { email: req.body.email },
      defaults: req.body,
    }).then(([result, created]) => {
      if (!created) {
        res.status(404).send({
          error: {
            message: '중복되는 email',
          },
        });
      } else {
        res.status(200).send(result);
      }
    });
  } catch (error) {
    res.status(500).send({ error: { message: 'server err' } });
  }
};

module.exports = signup;
