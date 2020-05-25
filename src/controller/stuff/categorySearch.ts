import express, { Request, Response, NextFunction } from 'express';
import sequelize from '../../models';
const opSequelize = require("sequelize");
const Op = opSequelize.Op
const { Category, Stuffs } = sequelize;

const categorySearch = async function(req: Request, res: Response) {
    try{
      let search = req.body.categoryName
      await Category.findAll({
          where: {
              name: {
                [Op.like]: "%"+search+"%"
              }
          },
          include: [{model: Stuffs}]
      }).then(result => {
          if(result.length){
          res.status(200).send(result)
          } else {
              res.status(404).send({ error: { message: '카테고리와 일치하는거 없음' } })
          }
      })


    }catch(error) {
        console.log(error)
        res.status(500).send(error)
    }
}
module.exports = categorySearch