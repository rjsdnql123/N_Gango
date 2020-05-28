import express, { Request, Response, NextFunction } from 'express';
import sequelize from '../../models';
const opSequelize = require("sequelize");
const Op = opSequelize.Op
const { Stuffs } = sequelize;

const stuffsearch = async function(req: Request, res: Response) {
  const { stuffname } = req.query;
  console.log(req.query.stuffname);
  try {
    await Stuffs.findAll({
      where: { 
        stuffname: {
          [Op.like]: "%"+stuffname+"%"
        }
       },
    }).then(result => {
      if (result.length) {
        res.status(200).send(result);
      } else {
        res.status(404).send('재료를 등록해 주세요');
      }
    });
  } catch (error) {
    res.status(500).send('GETStuff error');
  }
};
module.exports = stuffsearch;
