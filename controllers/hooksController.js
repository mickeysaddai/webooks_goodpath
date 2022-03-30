const axios = require('axios')


const sampleHookController = async(request, response) => {
    console.log(request.body)
    
    // const secondServerRequest = await axios.post('http://localhost:3009/api/v1/samplePOST', {
    //     data: {
    //         value: request.body
    //     }
    // });
    // const content = request.body.message
    console.log()
    const content = "a user logged in"
    // const avatarUrl = request.body.avatar
    try {
         const discordUrl = process.env.DISCORD_URL
         const discordHook = await axios.post('https://discord.com/api/webhooks/957842910328533083/3jtjIPCr-MtArCPXLZCiiNzi05WOuujRBhRDljjTOmTGYQ0KQjUqN-kANVdO2zbgLina', {
        content: content,
      embeds: [
        {
          image: {
            url: avatarUrl,
          },
        },
      ],
    })
    } catch(err) {
        console.log(err)
    }
   
    response.status(200).send("received")
}

const registerUsersController = async(request, response) => {
    //  const { errors, isValid } = validateRegisterInput(req.body);
    console.log("my req in hooks", request.body)
    response.send("received")
    
}



module.exports = {
    sampleHookController,
    registerUsersController
}