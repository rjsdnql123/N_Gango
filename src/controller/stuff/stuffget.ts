import express, { Request, Response, NextFunction } from "express";
import sequelize from "../../models";
const { Stuffs } = sequelize;

const stuffget = async function(req:Request, res: Response) {
    console.log(req,'req')
    try {
      await Stuffs.findAll({
          where: {stuffname: req.body.stuffname}
      }).then(result => {
          if(result.length) {
          res.status(200).send(result)
          } else {
              res.status(404).send('재료를 등록해 주세요')
          }
      })
    }catch(error) {
      res.status(500).send('GETStuff error')
    }
  }
module.exports = stuffget