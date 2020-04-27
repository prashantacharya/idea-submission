const express = require('express');
require('dotenv').config();

const databaseConnection = require('./database/connection');
const authRouter = require('./routes/auth');
const proposalRouter = require('./routes/proposal');
const userRouter = require('./routes/user');

const app = express();
databaseConnection();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('App running successfully');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/proposal', proposalRouter);
app.use('/api/v1/user', userRouter);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .send({ status: 'Error', message: error.message });
});

app.listen(3000, () => console.log('Running successfully'));
