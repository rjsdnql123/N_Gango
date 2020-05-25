import { Request, Response } from 'express';
import sequelize from '../../models';
const { Users, Comments, Recipes } = sequelize;

const mypage = async function(req: Request, res: Response) {
  try {
    const { data, recipeId, comment, rating } = req.body;
    const user = await Users.findOne({ where: { id: data } }).then(
      (res): any => res
    );
    if (!user) {
      return res
        .status(403)
        .send({ error: { message: 'not valid user/ token' } });
    }
    const recipe = await Recipes.findOne({ where: { id: recipeId } }).then(
      (res): any => res
    );
    if (!recipe) {
      return res.status(403).send({ error: { message: 'not valid recipe' } });
    }
    Comments.create({
      userId: data,
      recipId: recipeId,
      comment,
      rating,
    }).then(res1 => res.status(201).send(res1));
  } catch (error) {
    console.log(error);
    return res.status(500).send('server error');
  }
};

module.exports = mypage;
