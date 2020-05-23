import express, { Request, Response, NextFunction } from "express";
import sequelize from "../../models";
const { Recipes } = sequelize;

const recipe = async function(req: Request, res: Response) {
    try{
        await Recipes.findOrCreate({
          where: {name: req.body.name},
          defaults: req.body,
        })
        .then(([result, created]) => {
            if(created) {
              res.status(200).send(result)
            } else {
                res.status(404).send('이미 만든 레시피')
            }
        })
    } catch(error) {
        res.status(500).send('server error')
    }
}

module.exports = recipe