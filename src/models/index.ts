import { Sequelize } from 'sequelize-typescript';
require('dotenv').config();

console.log(process.env.NODE_ENV);

export const sequelize = new Sequelize({
  logging: false,
  database: 'Njango',
  dialect: 'mysql',
  username: 'root',
  password: process.env.DB_PASSWORD,
  models: [__dirname + '/*.model.ts'], // or [Player, Team],
});
// sequelize.sync({ force: process.env.NODE_ENV === 'dev' });
export default sequelize.models;
