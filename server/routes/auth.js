const router = require('express').Router();

const authController = require('../controllers/users')

router.post('/login',authController.login)
router.post('/update', authController.updateEmployer)


module.exports = router