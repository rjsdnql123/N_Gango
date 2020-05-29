import express, { Request, Response, NextFunction } from 'express';
import sequelize from '../../models';
const { Recipes, Stuffs } = sequelize;

const getRecipe = async function(req: Request, res: Response) {
  let params = req.query.id;
  console.log('PARAMS', params);
  try {
    const recipe = await Recipes.findAll({
      where: { id: params },
      include: [{ model: Stuffs }],
    }).then((res): any => res);
    if (!recipe) {
      res.status(404).send('레시피가 없음');
    } else {
      res.status(200).send(recipe);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
};

module.exports = getRecipe;
