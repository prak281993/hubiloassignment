const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');
const isAuth = require('./middlewares/isAuth');

const app = express();

const PORT = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(authRoute);
app.use(profileRoute);

app.use('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

mongoose.connect('mongodb+srv://prakhar:admin@cluster0-qejpw.mongodb.net/hubiloassignment', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(res => {
        console.log('MongoDB connected');
        const server = app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`)
        });

        const io = require('./socket').init(server);
        io.on('connection', socket => {
            console.log('client connected');
        });
        io.on('disconnect', () => {
            console.log('client disonnected');
        })
    })
    .catch(err => {
        console.log(err);
    })