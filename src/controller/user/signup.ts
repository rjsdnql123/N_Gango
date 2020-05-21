import express, { Request, Response, NextFunction } from 'express';
import sequelize from '../../models';
const { Users } = sequelize;

const signup = async function(req: Request, res: Response) {
  //   let user:Request = req.body
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

// module.exports = {
//     signup: {
//         post: async function (req: Request, res: Response) {
//             //   let user:Request = req.body
//             await Users.findOrCreate({
//                 where: { email: req.body.email },
//                 defaults: {
//                     userId: req.body.id,
//                     username: req.body.name,
//                     password: req.body.password,
//                     email: req.body.email
//                 }
//             })
//                 .then(([result, created]) => {
//                     if (!created) {
//                         res.status(404).send('중복되는 email')
//                     } else {
//                         res.status(200).send(result)
//                     }
//                 })
//         }
//     }
// }
