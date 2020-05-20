import express, { Request, Response, NextFunction } from "express"
import sequelize from "../../models";
const { Users } = sequelize;

const signin = async function (req: Request, res: Response) {
    console.log(req.body.email)
    await Users.findOne({
        where: {
            email: req.body.email,
            password: req.body.password,
        },
    }).then((result) => {
        if (!result) {
            res.status(401).send("Bad Authentication data");
        } else {
            res.status(201).send(result);
        }
    });
}

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