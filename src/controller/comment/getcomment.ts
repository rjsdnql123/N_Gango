import { Request, Response } from 'express';
import sequelize from '../../models';
const {Comments } = sequelize;

const getcomment = async function(req:Request, res: Response) {
    const {recipeId} = req.body
    console.log(recipeId)
    try{
    //   const getRecipe = await Recipes.findAll({
    //       where: {recipeId: recipeId}
    //   }).then((res) => res)
      await Comments.findAll({
          where: {recipId: recipeId}
      }).then((result) => {
          if(result.length) {
              res.status(200).send(result)
          }else {
              res.status(404).send('코멘트 없음')
          }
      })

    } catch(error) {
        console.log(error);
        res.status(500).send({error: 'server error'})
    }
}
module.exports = getcomment