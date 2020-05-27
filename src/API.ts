import { Request, Response } from "express";
import sequelize from "./models";
const { Stuffs } = sequelize;
const fetch = require("node-fetch");
const API = async function(req:Request, res:Response){
  return fetch(
    "http://openapi.foodsafetykorea.go.kr/api/ea552defb4c34654a96d/COOKRCP01/json/1/2"
  )
    .then((result: any) => {
      console.log(typeof result)
      return result.json();
    })
    .then((result: any) => {
      let arr = result.COOKRCP01.row;
      arr.forEach(async(element:any) => {
        let string = element.RCP_PARTS_DTLS;
        let index = string.indexOf("\n");
        let result = string.substring(index + 1);
        let arr = result.split(",");
        for (let i = 0; i < arr.length; i++) {
          var no = arr[i].replace(/[^0-9]/g, "");
          if(no){
            var strindex = arr[i].indexOf(no[0]);
          }
          let str = arr[i].substring(0, strindex);

          let resultStr = str.trim();
          Stuffs.findOrCreate({where: {stuffname: resultStr }
          })
        }
      });
      res.send('data save');
    });

}
module.exports = API