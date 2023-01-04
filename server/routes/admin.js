const router = require('express').Router()
const authController = require('../controllers/users')
const formationController = require('../controllers/formations')
const organismController = require('../controllers/organism')
const multer = require('../middlewares/multer-config')
const tryCatch = require('../middlewares/tryCatch')
const errorHandler = require('../middlewares/errorHandling')
// Add Employee
router.post('/addEmploye',multer.single('image'),tryCatch(authController.addEmployer))
// Routes des organism
router.get('/organism',tryCatch(organismController.getOrganism))
router.get('/organism/:id',tryCatch(organismController.getOneOrganism))
router.post('/organism', tryCatch(organismController.AddOrganism))
router.post('/organism/:id',tryCatch(organismController.UpdateOrganism))
router.get('/organism-delete/:id',tryCatch(organismController.DeleteOrganism))
// Routes des formations
router.get('/formations',tryCatch(formationController.getFormation))
router.get('/formation/:id',tryCatch(formationController.getOneFormation))
router.post('/formation',multer.single('image') ,tryCatch(formationController.AddFormation))
router.post('/formation/:id',multer.single('image'),tryCatch(formationController.UpdateFormation))
router.get('/formation-delete/:id',tryCatch(formationController.DeleteFormation))

router.use(errorHandler)

module.exports = router
