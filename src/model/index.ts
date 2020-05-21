import { Sequelize } from 'sequelize-typescript';
require('dotenv').config();

const sequelize = new Sequelize({
  database: 'Njango',
  dialect: 'mysql',
  username: 'root',
  password: process.env.DB_PASSWORD,
  models: [__dirname + '/*.model.ts'], // or [Player, Team],
});
sequelize.sync({ force: true });

export default sequelize.models;
