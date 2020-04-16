const express = require('express');
require('dotenv').config();

const databaseConnection = require('./database/connection');
const authRouter = require('./routes/auth');
const proposalRouter = require('./routes/proposal');

const app = express();
databaseConnection();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('App running successfully');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/proposal', proposalRouter);

app.listen(3000, () => console.log('Running successfully'));
