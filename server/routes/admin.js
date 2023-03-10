const router = require('express').Router()
const authController = require('../controllers/users')
const formationController = require('../controllers/formations')
const organismController = require('../controllers/organism')
const historiqueController = require('../controllers/historique')
const multer = require('../middlewares/multer-config')
const statistiquesController = require('../controllers/statistiques')

const tryCatch = require('../middlewares/tryCatch')
const errorHandler = require('../middlewares/errorHandling')
// Add Employee
router.post('/addEmploye',multer.single('image'),tryCatch(authController.addEmployer))
router.get('/employes',tryCatch(authController.Employer))
router.get('/employe',tryCatch(authController.filterUser))
// Routes des statistiques
router.get('/statistiques',tryCatch(statistiquesController.Statistiques))
// Routes des organismes
router.get('/organism',tryCatch(organismController.getOrganism))
router.get('/organism/:id',tryCatch(organismController.getOneOrganism))
router.post('/organism', tryCatch(organismController.AddOrganism))
router.put('/organism/:id',tryCatch(organismController.UpdateOrganism))
router.get('/organism-delete/:id',tryCatch(organismController.DeleteOrganism))
// Routes des formations
router.get('/formations',tryCatch(formationController.getFormation))
router.get('/formation/:id',tryCatch(formationController.getOneFormation))
router.post('/formation',multer.single('image') ,tryCatch(formationController.AddFormation))
router.put('/formation/:id',multer.single('image'),tryCatch(formationController.UpdateFormation))
router.get('/formation-delete/:id',tryCatch(formationController.DeleteFormation))
router.get('/filtred-formation',tryCatch(formationController.filtredFormation))
// Routes de l'hisque
router.get('/historique', tryCatch(historiqueController.getHistorique))
router.post('/historique',tryCatch(historiqueController.addHistorique))
router.get('/historique/:id', tryCatch(historiqueController.getOneHistorique))
router.put('/historique/:id', tryCatch(historiqueController.updateHistorique))

router.use(errorHandler)

module.exports = router
