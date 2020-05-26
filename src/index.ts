import express from 'express';
import sequelize from './models';
// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const bodyParser = require('body-parser');
const cors = require('cors');

// const router = express.Router()
import { jwtVerify } from './middleware/jwt';
const userRouter = require('./routes/user');
const mypageRouter = require('./routes/mypage');
const stuffRouter = require('./routes/stuff');
const commentRouter = require('./routes/comment');
const recipeRouter = require("./routes/recipe");
const PORT = process.env.PORT || '3001';
const API = require('./API')
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/mypage', jwtVerify, mypageRouter);
app.use('/stuff', stuffRouter);
app.use('/comment', jwtVerify, commentRouter);
app.use("/recipe", recipeRouter);

app.use('/', (req, res, next) => {
  
  // console.log(API.API())
  console.log(req.url);
  console.log(req.method);
  next();
});
//stuff 추가하기
app.post('/datasave',API);

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Success');
});

app.listen(PORT, () => {
  console.log('App started port : ', PORT);
});

export default app;
