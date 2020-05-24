import express from 'express';
import sequelize from './models';
const bodyParser = require('body-parser');
const cors = require('cors');

// const router = express.Router()
import { jwtVerify } from './middleware/jwt';
const userRouter = require('./routes/user');
const mypageRouter = require('./routes/mypage');
const stuffRouter = require('./routes/stuff');
const commentRouter = require('./routes/comment');
const PORT = process.env.PORT || '3001';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/mypage', jwtVerify, mypageRouter);
app.use('/stuff', stuffRouter);
app.use('/comment', jwtVerify, commentRouter);

app.use('/', (req, res, next) => {
  console.log(req.url);
  console.log(req.method);
  next();
});

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Success');
});

app.listen(PORT, () => {
  console.log('App started port : ', PORT);
});

export default app;
