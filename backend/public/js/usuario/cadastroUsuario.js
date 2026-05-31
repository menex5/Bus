const estado = document.getElementById('estado')
const cidade = document.getElementById('cidade')
const cep = document.getElementById('cep')
const rua = document.getElementById('rua')
const buscarCep = document.getElementById('buscarCep')

async function carregarEstados(){

    const resposta = await fetch(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
    )

    const estados = await resposta.json()

    estados.sort((a,b)=>a.nome.localeCompare(b.nome))

    estados.forEach((uf)=>{

        const option = document.createElement('option')

        option.value = uf.sigla
        option.textContent = `${uf.nome} (${uf.sigla})`

        estado.appendChild(option)
    })
}

async function carregarCidades(){

    if(!estado.value) return

    cidade.innerHTML =
        '<option value="">Carregando...</option>'

    const resposta = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado.value}/municipios`
    )

    const cidades = await resposta.json()

    cidade.innerHTML =
        '<option value="">Selecione</option>'

    cidades.forEach((item)=>{

        const option = document.createElement('option')

        option.value = item.nome
        option.textContent = item.nome

        cidade.appendChild(option)
    })
}

estado.addEventListener(
    'change',
    carregarCidades
)

buscarCep.addEventListener(
    'click',
    async ()=>{

        const cepLimpo =
            cep.value.replace(/\D/g,'')

        if(cepLimpo.length !== 8){

            alert('CEP inválido')
            return
        }

        try{

            const resposta = await fetch(
                `https://viacep.com.br/ws/${cepLimpo}/json/`
            )

            const endereco =
                await resposta.json()

            if(endereco.erro){

                alert('CEP não encontrado')
                return
            }

            rua.value =
                endereco.logradouro || ''

            estado.value =
                endereco.uf

            await carregarCidades()

            cidade.value =
                endereco.localidade

        }catch(erro){

            console.error(erro)

            alert(
                'Erro ao buscar CEP'
            )
        }
    }
)

carregarEstados()