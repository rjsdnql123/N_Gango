import { Request, Response, NextFunction } from 'express';
import sequelize from '../../model';
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
        res.status(401).send('Bad Authentication data');
      }
      return result;
    });
    if (user) {
      const token = jwtSign(user.id);
      res.status(201).send({ token: token });
    }
  } catch (error) {
    res.status(500).send('server err');
  }
};

module.exports = signin;

// module.exports = {
//     signin: {
//       get:  async function(req: Request, res: Response) {
//         console.log(req.body.email)
//           await Users.findOne({
//              where: {
//                email: req.body.email,
//                password: req.body.password,
//              },
//            }).then((result) => {
//              if (!result) {
//                res.status(401).send("Bad Authentication data");
//              } else {
//                res.status(201).send(result);
//              }
//            });
//       }
//     },
// }
