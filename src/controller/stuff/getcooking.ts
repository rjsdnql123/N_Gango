import { Request, Response } from 'express';
import sequelize from '../../models';
const { Recipes, Stuffs, Users } = sequelize;

const getCooking = async function(req: any, res: Response) {
  try {
    const stuffs = req.query.stuffname;
    const arr: any = [];
    for (let i = 0; i < stuffs.length; i++) {
      let { stuffname } = JSON.parse(req.query.stuffname[i]);
      console.log(stuffname);
      await Stuffs.findAll({
        where: { stuffname: stuffname },
        include: [
          { model: Recipes, include: [Stuffs, { model: Users, as: 'likes' }] },
        ],
      }).then((res: any) => arr.push(res));
    }
    if (arr[0].length) {
      res.status(200).send(arr[0]);
    } else {
      res.status(404).send('not stuff');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
};

module.exports = getCooking;
