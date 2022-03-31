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

const verifyHook = async(hookUrl, hookSecret) => {
  try {
    const buildHeader = () => {
      if (hookSecret) {
        return {
       headers: {
      'Authorization': `token ${hookSecret}`
      }
    }
      } else {
        return {}
      }
    }
    const header = buildHeader()
    
    const verifyRequest = await axios.get(hookUrl, header)
    
    console.log("verified!",verifyRequest);
    return true
  } catch (err) {
    console.log("Error verifying hook", err)
    return false
  }
}

const registerHooksController = async(request, response) => {
    //  const { errors, isValid } = validateRegisterInput(req.body);
    const hookPayload = request.body;
    const { url, secretToken } = hookPayload;
    const isVerifiedHook = await verifyHook(url, secretToken)
    if (isVerifiedHook) {
      // store in db & send successful response with message hook verified
    } else {
      // reject request with status 400, or something similar 
    }

    response.send("received")
    
}

const getHooksController = async(request, response) => {
  // Get userId from request body
  // look up Mongo for hooks for this user and return an array of hook objects 
}



module.exports = {
    sampleHookController,
   registerHooksController
}