//inicializa o servidor
//express é um microframework dentro do node; ajuda a ter definição de rotas etc
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://lana:marialuiza@teste-urlnv.mongodb.net/omnistack9?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//GET POST PUT DELETE
// req.query = Acessar query params - get
// req.params.id = Acessar params da rota pra put, delete
// req.body = Acessar corpo da requisição -  post, put

app.use(cors());
app.use(express.json()); //ó, utiliza o formato json!

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads'))); 
//quando usuario acessar /files vou usar express.static -> 
//é uma forma q express utiliza pra retornar arquivos estáticos, img, pdf, geralmente utilizados quando tem algum tipo de upload na apk
//nessa func passa o caminho de onde tá os arquivos upados

app.use(routes);

app.listen(3333); //porta que quero usar minha aplicação

/*app.post('/users', (req, res) => {

    return res.json(req.body);

});
primeiro parametro = rota do usuário; 2º parametro é uma função que recebe 2 funções
req: requisição, qualquer tipo de parametro que o usuário envia pra requisição
res: devolve uma resposta praquela requisição 
essas rota acima foi parar no routes.js*/

