const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')

router.get('/registro', authController.telaRegistro)
router.post('/registro', authController.registro)

module.exports = router