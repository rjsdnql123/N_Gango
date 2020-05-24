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
        const recipe = await Recipes.create({
          //   where: {name: req.body.name},
          //   id: req.body.id,
          userId: user.id,
          name: req.body.name,
          desc: req.body.desc,
          image: req.body.image,
          //   defaults: req.body,
        }).then((res): any => res);
        for(let i = 0; i < id.length; i++){
            let stuffId = id[i]
        const stuff = await Stuffs.findOne({ where: { id: stuffId } }).then(
          (res): any => res
        );
        if (!stuff) {
          return res
            .status(403)
            .send({ error: { message: "Bad request not stuff" } });
        }
        
        var [result] = await StuffRecipe.findOrCreate({
            where: {stuffId: stuff.id, recipeId: recipe.id }
        })
    }
        return res.status(201).send({ response: true });
        
    } catch(error) {
        console.log(error)
        res.status(500).send('server error')
    }
}

module.exports = recipe