// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;


// const UsersSchema = new Schema({
//     username: {
//         type: String,
//         require: true
//     },
//     email:{
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     }
// })

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})



const User = mongoose.model('User', UserSchema);
module.exports = User;