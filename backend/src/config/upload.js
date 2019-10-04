const multer = require('multer'); //esse é pra receber multipart form, arquivos, imagens etc; json n suporta
const path = require('path'); 
// path é do node, pra informar onde tá sem ser ../ etc, a barra do windows é inversa, o path.resolve n coloca barra, separa caminho por ,

module.exports = {
    storage: multer.diskStorage({ //como multer vai armazenar os arquivos que receber da aplicação
        destination: path.resolve(__dirname, '..', '..', 'uploads'), //qual pasta os arquivos serão salvos; __dirname é var global que informa qual é o diretorio atual
        filename: (req, file, cb) => {  //por padrao ele gera um codigo aleatorio -> req: requisição, file: nome, tipo, extensao do arquivo, etc; cb: callback, função q deve ser chamada assim que nome do arquivo tiver pronto
            
            //file.originalName: passo o nome completo da imagem pro path.extname buscar a extensão.
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext); //retorna só o nome da img, passa a extensao para removê-la
            
            cb(null, `${name}-${Date.now()}${ext}`); 
            
            //no lugar de nulo eu passaria um erro, caso tivesse acontecido erro
            //segundo parametro: vou formar o nome do arquivo pela junção de várias variáveis
            //file.fieldname: nome do campo do arquivo que veio lá do meu cliente
            //vou adicionar tb o timestamp da data atual; bom pra garantir que cada imagem vai ser unica e elas não vao se sobrepor
            
        },
    }), 
};