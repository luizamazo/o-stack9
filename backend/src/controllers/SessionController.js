//login, logout, tudo de sessão aqui dentro
const User = require('../models/User');

module.exports = {
    
    //essa função é assincrona pois ela pode levar um tempinho para executar, o create demora...
    //o await só vai deixar prosseguir pra proxima linha quando essa instrução finalizar; quando finalizar o cadastro no banco

    async store(req, res){

       //const email = req.body.email; //como tem email do lado esquerdo e direito,
       //posso mudar isso pra forma abaixo -> desestruturação; "estou buscando email de dentro do req.body"

       const {email} = req.body;

       let user = await User.findOne({ email }); //como só tenho email, procuro email; poderia passar dentro do objeto {email: email}, mas como são iguais, posso passar só email
        //se encontrar usuário com esse email digitado, salva na variavel user

        if(!user){ //se não encontrar usuário com o email, cria um 
            user = await User.create({ email }); //passo dentro as infos que quero criar o usuário
        }

        return res.json(user); //agr ele já é um objeto, o response
    }
};