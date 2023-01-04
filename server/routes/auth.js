const router = require('express').Router();

const authController = require('../controllers/users')

router.post('/login',authController.login)


module.exports = router