import express, { Request, Response, NextFunction } from "express";
import sequelize from "../../models";
const { Recipes, Users, Stuffs, StuffRecipe } = sequelize;

const recipe = async function(req: Request, res: Response) {
    const { data, id } = req.body;
    console.log(req.body)
    console.log(data)
    try{
        const user = await Users.findOne({where: {id: data}}).then(
            (res): any => res
        )
        if (!user) {
          return res.status(403).send({ error: { message: "Bad request not user" } });
        }
        const stuff = await Stuffs.findOne({ where: { id } }).then(
          (res): any => res
        );
        if (!stuff) {
          return res
            .status(403)
            .send({ error: { message: "Bad request not stuff" } });
        }
        const recipe = await Recipes.create({
        //   where: {name: req.body.name},
        //   id: req.body.id,
          userId: user.id,
          name: req.body.name,
          desc: req.body.desc,
          image: req.body.image
        //   defaults: req.body,
        })
        .then(
            (res): any => res
        )
        const [result, created] = await StuffRecipe.findOrCreate({
            where: {stuffId: stuff.id, recipeId: recipe.id }
        })
        if (!created) {
          await StuffRecipe.destroy({ where: { id: result.get("id") } });
          await res.status(201).send({ response: false });
        }
        return res.status(201).send({ response: true });
        
    } catch(error) {
        res.status(500).send('server error')
    }
}

module.exports = recipe