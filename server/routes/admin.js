const router = require('express').Router()
const authController = require('../controllers/users')
const formationController = require('../controllers/formations')
const organismController = require('../controllers/organism')

// Add Employee
router.post('/addEmploye',authController.addEmployer)
// Routes des organism
router.get('/organism',organismController.getOrganism)
router.get('/organism/:id',organismController.getOneOrganism)
router.post('/organism', organismController.AddOrganism)
router.post('/organism/:id',organismController.UpdateOrganism)
router.get('/organism-delete/:id',organismController.DeleteOrganism)
// Routes des formations
router.get('/formations',formationController.getFormation)
router.get('/formation/:id',formationController.getOneFormation)
router.post('/formation', formationController.AddFormation)
router.post('/formation/:id',formationController.UpdateFormation)
router.get('/formation-delete/:id',formationController.DeleteFormation)

module.exports = router
