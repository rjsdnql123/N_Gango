import { Request, Response } from 'express';
import sequelize from '../../models';
const { Users, Stuffs, UserStuff } = sequelize;

const addStuff = async function(req: Request, res: Response) {
  try {
    const { data, id } = req.body;
    const user = await Users.findOne({ where: { id: data } }).then(
      (res): any => res
    );
    if (!user) {
      return res
        .status(403)
        .send({ error: { message: 'Bad request not user' } });
    }
    const stuff = await Stuffs.findOne({ where: { id } }).then(
      (res): any => res
    );
    if (!stuff) {
      return res
        .status(403)
        .send({ error: { message: 'Bad request not stuff' } });
    }
    const [result, created] = await UserStuff.findOrCreate({
      where: { userId: user.id, stuffId: stuff.id },
      defaults: { limitDay: Date.now() + stuff.limitDay * 24 * 60 * 1000 },
    });
    if (!created) {
      await UserStuff.update(
        { limitDay: Date.now() + stuff.limitday * 24 * 60 * 1000 },
        { where: { id: result.get('id') } }
      );
      await res.status(201).send({ response: false });
    }
    return res.status(201).send({ response: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send('server error');
  }
};

module.exports = addStuff;
