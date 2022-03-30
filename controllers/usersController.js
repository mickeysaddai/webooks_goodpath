const User = require("../models/User");
const bcrypt = require("bcryptjs");
const keys = require('../config/keys');
const jwt = require('jsonwebtoken');
const discordService = require('../services/discordService')
const passport = require('passport');


const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const sampleUsersController = async(req, res) => {
    res.send("These are my users here")
}


const registerUsersController = (req, res) => {
     const { errors, isValid } = validateRegisterInput(req.body);
     
     if (!isValid) {
         return res.status(400).json(errors);
        }
        User.findOne({email: req.body.email})
        .then(async user => {

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
               const discordPayload = {
                   message: `${newUser.username} created an account :love:`,
                   avatarUrl: "No avatar"
               }
               try {
                               await discordService.discordPostService(discordPayload)

               } catch(err) {
                   console.log("Discord error",err)
               }
            }
        })
    
}


const loginUsersController = (req, res) => {
    console.log(req.body)
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(async user => {
            if(!user){
                return res.status(404).json({email: "This user does not exist"})
                
            }
        
            bcrypt.compare(password, user.password).then(async isMatch => {
                    if(password === user.password){
                        const payload = {
                            id: user.id,
                            username: user.username
                        }
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {expiresIn: 3600},
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                })
                            }
                         )
                         
                         const discordPayload = {
                              message: `${user.username} logged into their account`,
                              avatarUrl: "No avatar"
                            }
                            try {
                                await discordService.discordPostService(discordPayload)

                             } catch(err) {
                                console.log("Discord error",err)
                            }
        

                    } else{
                        return res.status(400).json({password: "Incorrect password"})
                    } 
                    
                })         
               
        })
        
}




module.exports = {
    sampleUsersController,
    registerUsersController,
    loginUsersController

}