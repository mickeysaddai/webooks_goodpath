const { default: axios } = require('axios')
const discordService = require('./discordService')
const Hook = require('../models/Hook')

/**
 * 
 * @param {string} hookUrl 
 * @param {any} data 
 * @returns 
 */
const tiggerHooks = async(hookUrl, data) => {
  if (hookUrl.includes('discord.com')) {
    return discordService.discordPostService(data, hookUrl)
  }
    const {url, hookSecret } = hookUrl
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
    const headers = buildHeader()
    return axios.post(hookUrl, {
        data,
       headers
    })

}

const fetchAndTriggerHooksForUser = async(userId, data, trigger) => {
    /**
     * fetch hooks for user
     * check if any of them are discord
     * use the discord service for discord urls
     * use axios.post for non-discord urls
     */
      Hook.find({
        user: userId,
        trigger
      }).then(async userHooks => {
        const hookPromises = userHooks.map(userHook => tiggerHooks(userHook.url, data))
        try {
           const firedHooks = await Promise.all(hookPromises)
           console.log(firedHooks)
        } catch(err) {
          console.log(err)
        }
       
      })
      .catch(console.log)
}



module.exports = {
fetchAndTriggerHooksForUser,
tiggerHooks
}
