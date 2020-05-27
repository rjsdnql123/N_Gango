import { Request, Response } from 'express';
import sequelize from '../../models';
const { Recipes, Stuffs } = sequelize;

const getCooking = async function(req:Request, res:Response) {
    try{
      await Stuffs.findAll({
           where: { stuffname: req.body.stuffname },
           include:  [{model: Recipes}]
      }).then((result) => {
        console.log(result)
        if (result.length) {
          res.status(404).send('not Stuff')
        } else {
          res.status(200).send(result)
        }
      })



    } catch(error) {
      console.log(error)
      res.status(500).send('server error')
    }
}

module.exports = getCooking