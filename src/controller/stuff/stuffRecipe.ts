import {Request, Response} from 'express';
import sequelize from '../../models';
const { StuffRecipe, Users, Recipes} = sequelize;

const stuffRecipe = async function(req: Request, res: Response) {
    try{
      const {data, id} = req.body;
      console.log(data,'data',id,'id')
      const user = await Users.findOne({ where: {id: data} }).then(
        (res): any => res
      );
      if(!user) {
        return res.status(403).send({errer: {message: 'Bad request not user'}})
      }
      const recipe = await Recipes.findOne({ where: {id}}).then(
        (res): any => res
      );
      if(!recipe) {
        return res.status(403).send({error: {message: 'Bad request not'}})
      }
      const [result, created] = await StuffRecipe.findOrCreate({
        where : {userId: user.id, stuffId: recipe.id}
      });
      if(!created) {
        await StuffRecipe.destroy({ where : {id: result.get('id')}});
        await res.status(201).send({ response: false})
      }
      return res.status(201).send({response: true});
    } catch (error){
      console.log(error)
      return res.status(500).send('server error')
    }
    
}
module.exports = stuffRecipe;