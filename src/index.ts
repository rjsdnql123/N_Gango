import express from 'express';
import sequelize from './models';
const { Users } = sequelize;

const PORT = process.env.PORT || '3001';

const app = express();

app.get('/', (req: express.Request, res: express.Response) => {
  console.log('/');
  Users.create({
    email: 'test',
    password: '1234',
    username: 'nameOfUser',
    token: 'A73628ANDJS',
  });
  res.send('Success');
});

app.listen(PORT, () => {
  console.log('App started port : ', PORT);
});
