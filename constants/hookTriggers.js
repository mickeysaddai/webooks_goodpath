
const HOOK_TRIGGERS = {
    POST_CREATED: 'POST_CREATED',
    USER_CREATED: 'USER_CREATED',
    USER_LOGGED_IN : 'USER_LOGGED_IN',
    POST_UPDATED: 'POST_UPDATED',
    POST_DELETED: 'POST_DELETED'
}

const HOOK_TRIGGER_KEYS = Object.keys(HOOK_TRIGGERS);

module.exports = {
    HOOK_TRIGGERS,
    HOOK_TRIGGER_KEYS
}

