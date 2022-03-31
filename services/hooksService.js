const { default: axios } = require('axios')
const discordService = require('./discordService')

const fetchAndTriggerHoolsForUser = async(userId, data) => {
    /**
     * fetch hooks for user
     * check if any of them are discord
     * use the discord service for discord urls
     * use axios.post for non-discord urls
     */
}

const tiggerHooks = async(hook, data) => {
    const {url, hookSecret } = hook
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
    return axios.post(hook, {
        data,
       headers
    })

}
