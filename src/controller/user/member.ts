import { Request, Response } from 'express';
import sequelize from '../../models';
const { Recipes, Users, Like } = sequelize;

const member = async function(req: Request, res: Response) {
  try {
    let urlParams = req.params.id;
    const user = await Users.findAll({ where: { username: urlParams } }).then(
      (res): any => res
    );
    const recipe = await Recipes.findAll({
      where: { userId: user[0].id },
    }).then((res): any => res);
    const like = await Like.findAll({
      where: { userId: user[0].id },
      //   include:[{
      //       model: Recipes
      //   }]
    }).then((res): any => res);
    let arr: any = [];
    for (let i = 0; i < like.length; i++) {
      var likeRecipe = await Recipes.findAll({
        where: { id: like[i].recipeId },
      }).then(result => {
        arr.push(result);
      });
    }

    res.status(200).send({ userRecipe: recipe, userLike: arr });
  } catch (error) {
    console.log(error);
    res.send(500).send({ messages: 'server error' });
  }
};

module.exports = member;
