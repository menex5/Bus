const express = require('express')
const router = express.Router()

const empresaController = require('../controllers/empresaController')

router.get('/dashboard', empresaController.dashboard)

router.get('/criar-rota', empresaController.criarRota)

router.get('/criar-funcionario', empresaController.criarFuncionario)

router.get('/criar-onibus', empresaController.criarOnibus)

router.get('/ver-rotas', empresaController.verRotas)

router.get('/ver-funcionarios', empresaController.verFuncionarios)

router.get('/ver-onibus', empresaController.verOnibus)

module.exports = router