const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {
    async index(req, res){
        const { tech } = req.query;

        //realizando filtro, pra mostrar os spots por tecnologias
        const spots = await Spot.find({ techs: tech }); 
        //mesmo o tech sendo uma string, ele vai dar match no array;
        //vai buscar a string dentro do array de todos os spots e retornar só os spots que tem aquela tecnologia
        return res.json(spots);
    },

    async store(req, res){
        const { filename } = req.file;
        const { company, techs, price } = req.body;
        const { user_id } = req.headers; //header: define o contexto da requisição. idioma do usuário, autenticação etc
        
        const user = await User.findById(user_id); //se usuario n existe, retorna erro

        if(!user){
            return res.status(400).json({error: 'User doesnt exist'}); //400 -> prob na requisiçao do usuario
        }

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            price,
            techs: techs.split(',').map(tech => tech.trim())
            //techs é uma string separada por virgulas! no bd, espero ela como array
            //split pra tirar as virgulas, map pra percorrer o array -> 
            //pra cada uma das tecnologias, faço trim, pra tirar espaço antes e depois da string 
        });

        return res.json({spot});
    }
};

//req.file pra acessar ibagem