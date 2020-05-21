import express, { Request, Response, NextFunction } from "express";
import sequelize from "../../models";
const { Stuffs, Category} = sequelize;
//이부분은 포린키가아니라  값이 들어와야한다?
const stuff = async function(req: Request, res: Response) {
    
    try {
      await Stuffs.create({
      // include: [
      //   {
      //     models: Category,
      //     // where: {}
      //   },
      // ],
      stuffname: req.body.stuffname,
      limitday: req.body.limitday,
      icon: req.body.icon,
      category: req.body.category
      
    }).then((result): any => {
      if(result) {
      res.status(200).send(result)
      } else {
        res.status(404).send('stuff err')
      }
    })
  } catch (err) {
      res.status(500).send('server err');
  }
}

module.exports = stuff