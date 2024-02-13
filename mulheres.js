const express = require('express') //aqui estou iniciando o express
const router = express.Router() //aqui estou configurando a primeira parte da rota
const cors = require('cors') //aqui estou trazendo o pacote cors, que permite consumir essa API no frontend
const conectabancoDeDados = require('./bancoDeDados') //estou ligando ao arquivo BancoDeDados
conectabancoDeDados() //chamando a função que conecta o bancoDeDados

const Mulher = require('./mulherModel')

const app = express() //aqui estou iniciando o app
app.use(express.json())
app.use(cors())

const porta = 3333 //aqui estou criando a porta

//GET
async function mostraMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find

        response.json(mulheresVindasDoBancoDeDados)
    } catch(erro){
        console.log (erro)
    }
}

//POST
async function criamulher (request, response) {
    const novaMulher = new Mulher ({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })

    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    } catch (erro) {
        console.log(erro)
    }
}

//PATCH
async function corrigeMulher(request, responde){
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)

        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }
    
        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio
        }
    
        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem
        }

        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao
        }

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()

        responde.json(mulherAtualizadaNoBancoDeDados)
    } catch (erro){
        console.log (erro)
    }
}

//Delete
async function deletaMulher(request, response) {
    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({menssagem: 'Mulher deletada com sucesso'})
    }catch (erro) {
        console.log (erro)
    }
}

//ROTAS
app.use(router.get('/mulheres',mostraMulheres)) //segunda configuração da rota, onde configurei rota get /mulheres
app.use(router.post('/mulheres', criamulher )) //configurei rota post /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)) //configurei a rota PATCH /mulheres/:id
app.use(router.delete('/mulheres/id:', deletaMulher)) //configurei rota delete /mulheres


function mostraPorta() {                               //essa é minha função porta
    console.log('servidor criado e rodando na porta ', porta)
}

app.listen(porta, mostraPorta) //servidor ouvindo a porta