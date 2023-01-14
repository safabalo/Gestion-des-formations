const router = require('express').Router();
const multer = require('../middlewares/multer-config')
const tryCatch = require('../middlewares/tryCatch')
const errorHandler = require('../middlewares/errorHandling')
const authController = require('../controllers/users')

router.post('/login',tryCatch(authController.login))
router.get('/logout',tryCatch(authController.logout))


router.use(errorHandler)

module.exports = router