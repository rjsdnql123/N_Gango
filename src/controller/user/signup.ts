import { Request, Response } from 'express';
import sequelize from '../../models';
const { Users } = sequelize;

const signup = async function(req: Request, res: Response) {
  console.log(req.body)
  await Users.findOrCreate({
    where: { email: req.body.email },
    defaults: req.body,
  }).then(([result, created]) => {
    if (!created) {
      res.status(404).send('중복되는 email');
    } else {
      res.status(200).send(result);
    }
  });
};

module.exports = signup;
