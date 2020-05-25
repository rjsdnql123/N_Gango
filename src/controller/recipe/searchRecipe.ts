import express, { Request, Response, NextFunction } from "express";
import sequelize from "../../models";
const opSequelize = require("sequelize");
const Op = opSequelize.Op
const { Recipes } = sequelize;


const searchRecipe = async function(req: Request, res: Response) {
    try{
      let search = req.body.name
      await Recipes.findAll({
          where: {
            name: {
            [Op.like]: "%"+search+"%"
            }
          }
      }).then(result => {
          if(result) {
              res.status(200).send(result)
          } else {
              res.status(404).send('레시피가 없습니다.')
          }
      })
    

    }catch(error) {
        console.log(error)
        res.status(500).send('server error')
    }
}
module.exports = searchRecipe