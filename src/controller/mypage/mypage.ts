import { Request, Response } from 'express';
import sequelize from '../../models';
import { jwtVerify } from '../../middleware/jwt';
const { Users, Stuffs, Comments, Recipes, Like } = sequelize;

const mypage = async function(req: Request, res: Response) {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(404).send({ error: { message: 'Login require' } });
    } else {
      const { data } = await jwtVerify(token);
      const user = await Users.findOne({
        where: { id: data },
        include: [
          { model: Users, as: 'followers' },
          { model: Users, as: 'followings' },
          Stuffs,
          Comments,
          { model: Recipes, as: 'recipes' },
          { model: Recipes, as: 'likes' },
        ],
      }).then((res): any => res);
      if (!user) {
        return user.status(500).send('server errpr');
      }
      return res.send(user);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send('server error');
  }
};

module.exports = mypage;
