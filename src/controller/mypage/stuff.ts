import { Request, Response } from 'express';
import sequelize from '../../models';
const { Users, Stuffs, UserStuff } = sequelize;

const addStuff = async function(req: Request, res: Response) {
  try {
    const { data, stuffname } = req.body;
    console.log(data, stuffname);

    const user = await Users.findOne({ where: { id: data } }).then(
      (res): any => res
    );
    if (!user) {
      return res
        .status(403)
        .send({ error: { message: 'Bad request not user' } });
    }
    const stuff = await Stuffs.findOne({
      where: { stuffname: stuffname },
    }).then((res): any => res);
    if (!stuff) {
      return res
        .status(403)
        .send({ error: { message: 'Bad request not stuff' } });
    }
    const [result, created] = await UserStuff.findOrCreate({
      where: { userId: user.id, stuffId: stuff.id },
    });
    if (!created) {
      await UserStuff.destroy({
        where: { userId: user.id, stuffId: stuff.id },
      });
      return res.status(201).send({ response: false });
    }
    return res.status(201).send({ response: stuff });
  } catch (error) {
    console.log(error);
    return res.status(500).send('server error');
  }
};

module.exports = addStuff;
