
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
// const LOGGER = require('log4js').getLogger();
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const hooksRouter = require('./routes/hooks');
const postsRouter = require('./routes/posts')

const mongoose = require("mongoose");
const db = require('./config/keys').mongoURI;

mongoose
.connect(db, {useNewUrlParser: true})
.then(() => console.log("connected to mongoDB"))
.catch((err) => console.log(err))

app.use(cors());


// LOGGER.level = 'debug';
const port = 3007;

console.log(process.env.REDIS_HOST);

app.use(bodyParser.json({ limit: '50mb' }));

app.use('/users', usersRouter);
app.use('/hooks', hooksRouter)
app.use('/posts', postsRouter)

app.get('/', (req, res) => {
    console.log(req.body)
  res.send('yooo');
});

app.post('/hello', (req, res) => {
    console.log(req.body)
  res.send('hi');
});



module.exports = app;