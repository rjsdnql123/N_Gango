import { Request, Response } from 'express';
import sequelize from '../../models';
const { Stuffs, Category, StuffCategory } = sequelize;

const stuff = async function(req: Request, res: Response) {
  const { stuffname, limitDay, icon, categoryName } = req.body;
  console.log(req.url);
  console.log(req.body);
  console.log(stuffname, limitDay, icon, categoryName);
  try {
    const category = await Category.findOrCreate({
      where: { name: categoryName },
    }).then(([res, create]) => res);
    if (!category) {
      return res
        .status(404)
        .send({ error: { massge: '카테고리를 설정해주세요 ' } });
    }
    await Stuffs.findOrCreate({
      where: { stuffname: req.body.stuffname },
      defaults: {
        stuffname,
        limitDay,
        icon,
      },
    }).then(([result, created]) => {
      if (created) {
        StuffCategory.create({
          stuffId: result.get('id'),
          categoryId: category.get('id'),
        });
        return res.status(200).send(result);
      } else {
        return res.status(404).send({ error: { message: '이미 있는 재료' } });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send('server err');
  }
};

module.exports = stuff;
