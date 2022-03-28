const User = require("../models/User");

const indexController = async(req, res) => {
    const user = new User({
        name: "mickey",
        email: "mickey.addai@gmail.com",
        password: "mickeysaddai"

    })
    user.save()
    res.render('index', { title: 'Express' });
}

module.exports = {
    indexController
}