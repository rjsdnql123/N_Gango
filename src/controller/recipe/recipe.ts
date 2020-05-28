import express, { Request, Response, NextFunction } from 'express';
import sequelize from '../../models';
const { Recipes, Users, Stuffs, StuffRecipe } = sequelize;

const recipe = async function(req: Request, res: Response) {
  const { data, stuffs, name, desc, image } = req.body;
  try {
    const user = await Users.findOne({ where: { id: data } }).then(
      (res): any => res
    );
    if (!user) {
      return res
        .status(403)
        .send({ error: { message: 'Bad request not user' } });
    }
    const recipe = await Recipes.create({
      userId: data,
      name,
      desc,
      image,
    }).then((res): any => res);
    for (let i = 0; i < stuffs.length; i++) {
      let stuffName = stuffs[i];
      
      const stuff = await Stuffs.findOne({
        where: { stuffName: stuffName },
      }).then((res): any => res);
      if (!stuff) {
        return res
          .status(403)
          .send({ error: { message: 'Bad request not stuff' } });
      }

      await StuffRecipe.findOrCreate({
        where: { stuffId: stuff.get('id'), recipeId: recipe.id },
      });
    }

    return res.status(201).send(recipe);
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
};

module.exports = recipe;
