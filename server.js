const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(authRoute);
app.use(profileRoute);

mongoose.connect('mongodb+srv://prakhar:admin@cluster0-qejpw.mongodb.net/hubiloassignment', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(res => {
        console.log('MongoDB connected');
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`)
        })
    })
    .catch(err => {
        console.log(err);
    })