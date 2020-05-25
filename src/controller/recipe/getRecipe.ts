import express, { Request, Response, NextFunction } from "express";
import sequelize from "../../models";
const { Recipes, Users, Stuffs, StuffRecipe } = sequelize;

const getRecipe = async function(req: Request, res: Response) {
  try{
    const recipe = await Recipes.findAll({ where: { name: req.body.name } }).then(
      (res): any => res
    )
    console.log(recipe[0],'reciep')
    const stuffAndRecipe = StuffRecipe.findAll({where: {recipeId: recipe.id}})

  } catch(error){
    res.status(500).send('server error')
  }
  }

module.exports = getRecipe;