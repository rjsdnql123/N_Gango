import express from 'express';
import sequelize from './models';
const bodyParser = require('body-parser');
const cors = require('cors');

// const router = express.Router()
const { Users } = sequelize;
const userRouter = require('./routes/user');
const stuffRouter = require("./routes/stuff");

const PORT = process.env.PORT || '3001';





const app = express();
app.use(cors())
app.use(bodyParser.json());

app.use('/user', userRouter)
app.use("/stuff", stuffRouter);

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Success');
});

app.listen(PORT, () => {
  console.log('App started port : ', PORT);
});
