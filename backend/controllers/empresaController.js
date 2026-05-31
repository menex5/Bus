exports.dashboard = (req, res) => {
    res.render('empresa/dashboardEmpresa')
}

exports.criarRota = (req, res) => {
    res.render('empresa/criarRota')
}

exports.criarFuncionario = (req, res) => {
    res.render('empresa/criarFuncionario')
}

exports.criarOnibus = (req, res) => {
    res.render('empresa/criarOnibus')
}

exports.verRotas = (req, res) => {
    res.render('empresa/verRotas')
}

exports.verFuncionarios = (req, res) => {
    res.render('empresa/verFuncionarios')
}

exports.verOnibus = (req, res) => {
    res.render('empresa/verOnibus')
}