const { default: axios } = require("axios");
const discordService = require("./discordService");
const Hook = require("../models/Hook");

/**
 *
 * @param {string} hookUrl
 * @param {any} data
 * @returns
 */
const tiggerHooks = async (hookUrl, data, hookSecret) => {
  if (hookUrl.includes("discord.com")) {
    return discordService.discordPostService(data, hookUrl);
  }
  const buildHeader = () => {
    if (hookSecret) {
      return {
        headers: {
          Authorization: `token ${hookSecret}`,
        },
      };
    } else {
      return {};
    }
  };
  const headers = buildHeader();
  return axios.post(hookUrl, {
    data,
    headers,
  });
};
/**
 * * fetch hooks for user
 * check if any of them are discord
 * use the discord service for discord urls
 * use axios.post for non-discord urls
 * @param {*} userId
 * @param {*} data
 * @param {*} trigger
 */
const fetchAndTriggerHooksForUser = async (userId, data, trigger) => {
  Hook.find({
    user: userId,
    trigger,
  })
    .then(async (userHooks) => {
      const hookPromises = userHooks.map((userHook) =>
        tiggerHooks(userHook.url, data, userHook.secretToken)
      );
      try {
        const firedHooks = await Promise.all(hookPromises);
        console.log(firedHooks);
      } catch (err) {
        console.log(err);
      }
    })
    .catch(console.log);
};

const verifyHook = async (hookUrl, hookSecret) => {
  try {
    const buildHeader = () => {
      if (hookSecret) {
        return {
          headers: {
            Authorization: `token ${hookSecret}`, // TODO: verify this
          },
        };
      } else {
        return {};
      }
    };
    const header = buildHeader();

    const verifyRequest = await axios.get(hookUrl, header);

    console.log("verified!", verifyRequest);
    return true;
  } catch (err) {
    console.log("Error verifying hook", err);
    return false;
  }
};

module.exports = {
  fetchAndTriggerHooksForUser,
  tiggerHooks,
  verifyHook,
};
