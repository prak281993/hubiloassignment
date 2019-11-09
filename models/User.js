const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    device_token: String,
    device_type: String
});

module.exports = mongoose.model('User', userSchema);