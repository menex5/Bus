const express = require('express')

const router = express.Router()

router.get('/home', (req, res) => {

    res.render('usuario/home')

})

router.get('/login', (req, res) => {

    res.render('usuario/loginUsuario')

})

module.exports = router