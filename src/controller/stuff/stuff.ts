import express, { Request, Response, NextFunction } from "express";
import sequelize from "../../models";
const { Stuffs } = sequelize;

const stuff = async function(req: Request, res: Response) {
    await Stuffs.
}