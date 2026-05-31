const bcrypt = require('bcrypt')
const db = require('../database/db')

exports.telaRegistro = (req, res) => {
    res.render('usuario/cadastroUsuario')
}

exports.registro = async (req, res) => {

    try {

        const {
            nome,
            cpf,
            email,
            telefone,
            rua,
            cep,
            cidade,
            estado,
            senha
        } = req.body

        const senhaHash = await bcrypt.hash(senha, 10)

        const sql = `
        INSERT INTO usuarios
        (
            nome,
            cpf,
            email,
            telefone,
            rua,
            cep,
            cidade,
            estado,
            senha,
            tipo
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'cliente')
        `

        db.query(
            sql,
            [
                nome,
                cpf,
                email,
                telefone,
                rua,
                cep,
                cidade,
                estado,
                senhaHash
            ],
            (erro) => {

                if (erro) {
                    return res.status(500).send('Erro ao cadastrar')
                }

                res.redirect('/usuario/login')
            }
        )

    } catch (erro) {

        res.status(500).send('Erro interno')

    }
}