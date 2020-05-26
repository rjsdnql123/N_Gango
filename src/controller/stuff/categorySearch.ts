import express, { Request, Response, NextFunction } from 'express';
import sequelize from '../../models';
const opSequelize = require("sequelize");
const Op = opSequelize.Op
const { Category, Stuffs, StuffRecipe } = sequelize;

const categorySearch = async function(req: Request, res: Response) {
    try{
      let categoryName = req.body.categoryName
      await Category.findAll({
          where: {
              name: {
                [Op.like]: "%"+categoryName+"%"
              }
          },
      }).then((result) => {
          if(result.length) {
              res.status(200).send(result)
          } else {
              res.status(404).send({error: '카테고리 없음'})
          }
      })
    }catch(error) {
        console.log(error)
        res.status(500).send(error)
    }
}
module.exports = categorySearch