const express = require('express')
const path = require('path')

const usuarioRoutes = require('./routes/usuarioRoutes')
const authRoutes = require('./routes/authRoutes')
const empresaRoutes = require('./routes/empresaRoutes')

const app = express()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/usuario', usuarioRoutes)
app.use('/auth', authRoutes)
app.use('/empresa', empresaRoutes)

app.get('/', (req, res) => {
    res.redirect('/usuario/home')
})

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000')
})