import express, { Request, Response, NextFunction } from 'express';
import sequelize from '../../models';
const opSequelize = require("sequelize");
const Op = opSequelize.Op
const { Category, Stuffs } = sequelize;

const categorySearch = async function(req: Request, res: Response) {
    try{
      let search = req.body.name
      await Category.findAll({
          where: {
              name: {
                [Op.like]: "%"+search+"%"
              }
          },
          include: [{model: Stuffs}]
      }).then(result => {
          console.log(result)
          res.status(200).send(result)
      })


    }catch(error) {
        console.log(error)
    }
}
module.exports = categorySearch