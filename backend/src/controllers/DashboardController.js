//perfil do usuário, listar os spots cadastrados pelo user logado
const Spot = require('../models/Spot');

module.exports = {
    async show(req, res){
        const { user_id } = req.headers;

        const spots = await Spot.find({ user: user_id }); 
        //busca todos os spots em que o campo user é igual ao user_id vindo do cabeçalho

        return res.json(spots);
    }
}