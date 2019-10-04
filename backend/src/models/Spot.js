const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    thumbnail: String, //salva só o nome da imagem
    company: String,
    price: Number, 
    techs: [String], //vetor com várias strings dentro
    //salva o usuário que criou o spot
    user: {
        type: mongoose.Schema.Types.ObjectId, //objectId é o id que ele coloca automaticamente nos bancos
        ref: 'User' //ref: referencia pra qual model é essa info, a de user se refere ao model user
    } 
}, {
    //passa configs pro mongoose, na toJSON: quero dizer q toda vez q um spot for convertido em json, calcule os virtuals automaticamente
    //coloque os virtuals junto ao json
    toJSON: {
        virtuals: true,
    }
});

//obs
SpotSchema.virtual('thumbnail_url').get(function(){ //n pode ser => por causa do uso do this aqui
    return `http://localhost:3333/files/${this.thumbnail}`
})

module.exports = mongoose.model('Spot', SpotSchema);

// obs: toda vez que listar spot, ele retorna todos os campos
// vou fazer ele criar um novo campo que será computado pelo javascript
// ele n existe no banco, mas será criado pelo JS
// dentro do mongo isso é chamado de virtual
// no json será passado então url pra thumbnail, mas sem a rota ela nao tem nada
// essa rota /files precisa então existir pra retornar a img com o nome especificado
// express tem uma funcionalidade pronta pra isso, segue pro arquivo server.js