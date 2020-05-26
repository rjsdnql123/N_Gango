import { Request, Response } from 'express';
import sequelize from '../../models';
const { Category } = sequelize;

const category = async function(req: Request, res: Response) {
  Category.findOrCreate({
    where: { name: req.body.name },
  }).then(([result, created]): void => {
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send('오류발생');
    }
  });
};

module.exports = category;