import { Request, Response } from 'express';
import sequelize from '../../models';
const { Recipes, Stuffs } = sequelize;

const sutffJoinRecipe = async function(req:Request, res:Response) {
    try{
      const stuff =  await Stuffs.findAll({
           where: { stuffname: req.body.stuffname },
           include:  [{model: Recipes}]
      }).then(
          (res): any => res
      )
      if(!stuff) {
          res.status(404).send('not Stuff')
      } else{
          res.status(200).send(stuff)
      }


    } catch(error) {
      console.log(error)
      res.status(500).send('server error')
    }
}

module.exports = sutffJoinRecipe