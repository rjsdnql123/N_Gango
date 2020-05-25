import { Request, Response } from 'express';
import sequelize from '../../models';
const { Users, Stuffs, Comments, Recipes, Category } = sequelize;

const mypage = async function(req: Request, res: Response) {
  try {
    const { data } = req.body;
    console.log(data);
    const user = await Users.findOne({
      where: { id: data },
      include: [
        { model: Users, as: 'followers' },
        { model: Users, as: 'followings' },
        { model: Stuffs, include: [Category] },
        { model: Comments },
        { model: Recipes, as: 'recipes' },
        { model: Recipes, as: 'likes' },
      ],
    }).then((res): any => res);
    if (!user) {
      return user.status(404).send({ error: { message: 'not valid user' } });
    }
    return res.send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send('server error');
  }
};

module.exports = mypage;
