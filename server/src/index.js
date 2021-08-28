import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';

import router from './routes/index.js';

dotenv.config();

const port = process.env.PORT || 5000;
const pass = process.env.PASS;
const user = process.env.USER;
const url = `mongodb+srv://${user}:${pass}@blog.o8ec5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/', router);

const start = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conected to DB...');
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
