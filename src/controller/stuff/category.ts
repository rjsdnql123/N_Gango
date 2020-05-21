import express, { Request, Response, NextFunction } from "express";
import sequelize from "../../models";
const { Category } = sequelize;

const category = async function(req: Request, res: Response) {
    await Category.create({
        name: req.body.name
    }).then(result => {
        if(result) {
            res.status(200).send(result)
        } else{
            res.status(404).send('오류발생')
        }
    })
}

module.exports = category