const estadoOrigem = document.getElementById('estadoOrigem')

const estadoDestino = document.getElementById('estadoDestino')

const origem = document.getElementById('origem')

const destino = document.getElementById('destino')

const trocarBtn = document.getElementById('trocarBtn')

async function carregarEstados(){

    const resposta = await fetch(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
    )

    const estados = await resposta.json()

    estados.sort((a,b) => a.nome.localeCompare(b.nome))

    estados.forEach((estado) => {

        const optionOrigem = document.createElement('option')

        optionOrigem.value = estado.sigla

        optionOrigem.textContent =
            `${estado.nome} (${estado.sigla})`

        estadoOrigem.appendChild(optionOrigem)

        const optionDestino = document.createElement('option')

        optionDestino.value = estado.sigla

        optionDestino.textContent =
            `${estado.nome} (${estado.sigla})`

        estadoDestino.appendChild(optionDestino)

    })

}

async function carregarCidades(selectEstado, selectCidade){

    selectCidade.innerHTML =
        '<option value="">Carregando cidades...</option>'

    const uf = selectEstado.value

    if(!uf){

        selectCidade.innerHTML =
            '<option value="">Selecione a cidade</option>'

        return

    }

    const resposta = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
    )

    const cidades = await resposta.json()

    selectCidade.innerHTML =
        '<option value="">Selecione a cidade</option>'

    cidades.forEach((cidade) => {

        const option = document.createElement('option')

        option.value = cidade.nome

        option.textContent = cidade.nome

        selectCidade.appendChild(option)

    })

}

estadoOrigem.addEventListener('change', () => {

    carregarCidades(estadoOrigem, origem)

})

estadoDestino.addEventListener('change', () => {

    carregarCidades(estadoDestino, destino)

})

carregarEstados()

trocarBtn.addEventListener('click', async () => {

    const estadoTemp = estadoOrigem.value

    const cidadeTemp = origem.value

    estadoOrigem.value = estadoDestino.value

    estadoDestino.value = estadoTemp

    await carregarCidades(estadoOrigem, origem)

    await carregarCidades(estadoDestino, destino)

    origem.value = destino.value

    destino.value = cidadeTemp

})