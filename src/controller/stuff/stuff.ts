import { Request, Response } from 'express';
import sequelize from '../../models';
const { Stuffs, Category } = sequelize;
//이부분은 포린키가아니라  값이 들어와야한다?
const stuff = async function(req: Request, res: Response) {
  console.log(req.body)
  console.log('레시피')
  try {
    await Stuffs.findOrCreate({
      where: { stuffname: req.body.stuffname },
      defaults: req.body,
    }).then(([result, created]) => {
      if (created) {
        res.status(200).send(result);
      } else {
        res.status(404).send('이미 있는 재료');
      }
    });
  } catch (err) {
    res.status(500).send('server err');
  }
};

module.exports = stuff;
