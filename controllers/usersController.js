const res = require("express/lib/response")
const User = require("../models/User")

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
                newUser.save()
                .then(user => res.send(user))
                .catch(err => res.send(err))
            }
        })

   

}
module.exports = {
    sampleUsersController,
    postUsersController

}