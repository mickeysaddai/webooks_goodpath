const axios = require('axios');




const defaultDiscordEndpoint = 'https://discord.com/api/webhooks/957842910328533083/3jtjIPCr-MtArCPXLZCiiNzi05WOuujRBhRDljjTOmTGYQ0KQjUqN-kANVdO2zbgLina'
/**
 * 
 *@typedef {Object} DiscordPayload
 * @property {string} message 
 * @property {string} avatarUrl
 */

/**
 * 
 * @param {string} discordEndpoint 
 * @param {DiscordPayload} data 
 * @returns Promise
 */
const discordPostService = async ( data, discordEndpoint = defaultDiscordEndpoint,) => {
    const content = data.message;
    const avatarUrl = data.avatarUrl
    return axios.post(discordEndpoint, {
         content: content,
    })
}

module.exports = {
    discordPostService
}