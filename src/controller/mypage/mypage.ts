import { Request, Response } from 'express';
import sequelize from '../../models';
const { Users, Stuffs, Comments, Recipes, Category } = sequelize;

const mypage = async function(req: Request, res: Response) {
  try {
    const { data } = req.body;
    const user = await Users.findOne({
      where: { id: data },
      include: [
        { model: Users, as: 'followers', limit: 5 },
        { model: Users, as: 'followings', limit: 5 },
        { model: Stuffs, limit: 5 },
        { model: Comments, limit: 5 },
        { model: Recipes, as: 'recipes', limit: 5 },
        { model: Recipes, as: 'likes', limit: 5 },
      ],
    }).then((res): any => res);
    if (!user) {
      return user.status(500).send('server errpr');
    }
    return res.send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send('server error');
  }
};

module.exports = mypage;
