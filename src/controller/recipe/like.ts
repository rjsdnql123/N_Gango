import { Request, Response } from 'express';
import sequelize from '../../models';
const { Recipes, Users, Like, Stuffs, StuffRecipe } = sequelize;

const like = async function(req: Request, res: Response) {
  const { data, recipeIds } = req.body;
  try {
    const user = await Users.findOne({ where: { id: data } }).then(
      (res): any => res
    );
    if (!user) {
      return res
        .status(403)
        .send({ error: { message: 'Bad request not user' } });
    }
    recipeIds.forEach(async (recipeId: number) => {
      const recipe = await Recipes.findOne({
        where: { id: recipeId },
      }).then((res): any => res);
      if (!recipe) {
        return res
          .status(403)
          .send({ error: { message: 'Bad request not recipe' } });
      }
      await Like.findOrCreate({
        where: { recipeId: recipe.get('id'), userId: data },
      }).then(([result, created]): void => {
        if (!created) {
          Like.destroy({
            where: { id: result.get('id') },
          }).then(likeRes => {});
        }
      });
    });
    res.status(201).send({ response: 'good' });
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
};

module.exports = like;
