const express = require('express')
const router = express.Router()

const app = express()
const porta = 3333

const mulheres = [
    {
        nome: 'Lucimara',
        Imagem: '1',
        minibio: 'desenvolvedora, instrutora'
    },
    {
        nome: 'Iana Chan',
        imagem: '2',
        minibio: 'criadora da progrmaria'
    },
    {
        nome: 'nina',
        imagem: '3' ,
        minibio: 'hacker'
    }
]

function mostraMulheres(request, response) {
    response.json(mulheres)
}

function mostraPorta() {
    console.log('servidor criado e rodando na porta ', porta)
}

app.use(router.get('/mulheres',mostraMulheres))
app.listen(porta, mostraPorta)