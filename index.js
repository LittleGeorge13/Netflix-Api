require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const movieRoute = require('./routes/movies');
const listRoute = require('./routes/lists');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
});
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/users', userRoute);
app.use('/movies', movieRoute);
app.use('/lists', listRoute);

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.bhrgwvi.mongodb.net/${process.env.MONGO_DB_DATABASE}?appName=Cluster0`;

mongoose.connect(MONGODB_URI).then(async () => {
    app.listen(process.env.PORT || 8800, () => { console.log('Backend server is running!'); });
}).catch(error => {
    throw new Error(error);
});
