const router = require('express').Router();
const multer = require('../middlewares/multer-config')
const tryCatch = require('../middlewares/tryCatch')
const errorHandler = require('../middlewares/errorHandling')
const authController = require('../controllers/users')

router.post('/login',tryCatch(authController.login))
router.post('/update', multer.single('image'), tryCatch(authController.updateEmployer))

router.use(errorHandler)

module.exports = router