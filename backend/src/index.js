//Declarando variaveis
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app = express()

//Http e socket.io (realtime)
const server = require('http').Server(app)
const io = require('socket.io')(server)

mongoose.connect('mongodb+srv://root:toor@cluster0-lq6wu.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
})

//Configurando para que todo os usuarios recebam atualizacoes em tempo real
app.use((req, res, next) => {
    req.io = io

    next()
})

//Permitindo que todos possam consumir a API
app.use(cors())

//Configurando para que as imagens sejam acessiveis via URL
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))

//Arquivo de configuracao das rotas
app.use(require('./routes'))

//Configurando porta do servidor
server.listen(3333)

