const express = require('express');
const Hook = require('../models/Hook')
const axios = require('axios');
const router = express.Router();
const passport = require('passport');
const hooksController = require('../controllers/hooksController')
const { HOOK_TRIGGERS, HOOK_TRIGGER_KEYS } = require('../constants/hookTriggers')

router.get('/', hooksController.getAllHooksController)
// router.post('/registerHook', hooksController.registerHooksController )
router.get('/user/:user_id', hooksController.getUserHooksController);
router.delete('/:id', hooksController.deleteSingleHookController)
router.put('/:id', hooksController.putSingleHookController)


const verifyHook = async(hookUrl, hookSecret) => {
  try {
    const buildHeader = () => {
      if (hookSecret) {
        return {
       headers: {
      'Authorization': `token ${hookSecret}` //TODO: verify this
      }
    }
      } else {
        return {}
      }
    }
    const header = buildHeader();
    
    const verifyRequest = await axios.get(hookUrl, header)
    
    console.log("verified!",verifyRequest);
    return true
  } catch (err) {
    console.log("Error verifying hook", err)
    return false
  }
}


router.post("/register",
    passport.authenticate('jwt', { session: false }),
    async(req, res) => {
      if (!HOOK_TRIGGER_KEYS.includes(req.body.trigger)) {
        return res.status(400).send(`Hook trigger must be one of ${HOOK_TRIGGER_KEYS}`)
      }

      const newHook = new Hook({
        user: req.user.id,
        url: req.body.url,
        secretToken: req.body.secretToken,
        trigger: req.body.trigger
      });
      
      
      const { url, secretToken } = newHook;
      const isVerifiedHook = await verifyHook(url, secretToken);
        if (isVerifiedHook) {
        return newHook.save().then(hook => {
          res.status(200).json(hook)
        }).catch((err) => {
           res.status(500).json(err)
        })
    } else {
      return res.status(400).json({Error: "Hook verification failed"});
    }
  
  
    });

  module.exports = router;



