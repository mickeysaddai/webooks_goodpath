const User = require("../models/User");
const bcrypt = require("bcryptjs");

const sampleUsersController = async(req, res) => {
    res.send("These are my users here")
}


const postUsersController = (req, res) => {
        User.findOne({email: req.body.email})
        .then(user => {

            if (user){
    
                res.status(400).json({email: "A user is already registered with that email"})
            } else{
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash
                        newUser.save()
                        .then((user) => res.json(user))
                        .catch(err => console.log(err))

                    })
                })
            }
        })

   

}
module.exports = {
    sampleUsersController,
    postUsersController

}