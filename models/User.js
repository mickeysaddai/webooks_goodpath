const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UsersSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})


const User = mongoose.model('users', UsersSchema);
module.exports = User;