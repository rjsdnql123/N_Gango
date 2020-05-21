import { Sequelize } from 'sequelize-typescript';
require('dotenv').config();

const sequelize = new Sequelize({
  database: 'Njango',
  dialect: 'mysql',
  username: 'root',
  password: '[dnjs1541]',
  models: [__dirname + '/*.model.ts'], // or [Player, Team],
});
sequelize.sync({ force: true });

export default sequelize.models;
