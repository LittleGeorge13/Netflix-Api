require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');

app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/users', userRoute);

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.bhrgwvi.mongodb.net/${process.env.MONGO_DB_DATABASE}?appName=Cluster0`;

mongoose.connect(MONGODB_URI).then(async () => {
    app.listen(process.env.PORT || 8800, () => { console.log('Backend server is running!'); });
}).catch(error => {
    throw new Error(error);
});
