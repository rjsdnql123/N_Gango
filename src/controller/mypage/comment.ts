import { Request, Response } from 'express';
import sequelize from '../../models';
const { Users } = sequelize;

const userComment = async function(req: Request, res: Response) {
  try {
    const { data } = req.body;
    const comments = await Users.findAll({ where: { userId: data } }).then(
      (res): any => res
    );
    return res.send(comments);
  } catch (error) {
    console.log(error);
    return res.status(500).send('server error');
  }
};

module.exports = userComment;
