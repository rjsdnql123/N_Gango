import { Request, Response } from 'express';
import sequelize from '../../models';
const { Stuffs, Category, StuffCategory } = sequelize;
//이부분은 포린키가아니라  값이 들어와야한다?
const stuff = async function(req: Request, res: Response) {
  const { stuffname, limitDay, icon, categoryName } = req.body;
  try {
    const category = await Category.findOne({ where: { name: categoryName } });
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
        // icon,
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
