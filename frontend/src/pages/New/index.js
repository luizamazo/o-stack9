import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg';

import './styles.css';

export default function New({ history }){
    //estado pra armazenar o valor da thumbnail, pra mostrar preview antes mesmo de salvar no bd
    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');

    //toda vez q altera um estado ele executa a função de novo, o componente é remontado do 0
    //quero formar um valor através da atualização da var thumbnail, toda vez q ela att, quero criar uma preview dela
    //n importa se o user seleciona uma, dps outra, dps outra... vou criar uma preview toda vez que esse valor da thumbnail mudar
    //por isso o useMemo, ele fica observando o valor de uma outra variavel e toda vez q ela alterar ele gera um novo valor pra alguma variavel
    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
        //se thumbnail existe ->
        //URL é var global do html; createObjectURL cria url pra uma var temporaria q ainda nao foi feita upload 
        //e passa thumbnail como parametro; se n existe thumbnail, retorna null

    }, [thumbnail] //quando alterado a thumbnail, faz a funçao executar novamente tipo useEffects
    )
    
    async function handleSubmit(event){
        event.preventDefault();
        
        //pra enviar multipart form nao passo {} como segundo parametro, preciso criar FormData
        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: { user_id }
        });

        history.push('/dashboard');
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <label 
                id="thumbnail" 
                style={{ backgroundImage: `url(${preview})`}}
                className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} alt="Select img"/>
            </label>

            <label htmlFor="company">EMPRESA *</label>
            <input
                id="company"
                placeholder="Sua empresa incrível"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />

            <label htmlFor="techs">TECNOLOGIAS * <span>(Separadas por vírgula)</span></label>
            <input
                id="techs"
                placeholder="Quais tecnologias usam?"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />

            <label htmlFor="price">VALOR DA DIÁRIA * <span>(Em branco para GRATUITO)</span></label>
            <input
                id="price"
                placeholder="Valor cobrado por dia"
                value={price}
                onChange={event => setPrice(event.target.value)}
            />

            <button submit="submit" className="btn">Cadastrar</button>
        </form>
    )
}
// há bibliotecas que facilitam criação de formulário! 
// no input de file, como sempre target.files será um vetor (apesar de no back ter sido escrito com single e não mult pra multiplas imgs)
// pega o indice 0 dele do mesmo jeito, pois será o unico arquivo que o usuário selecionou

//na thumbnail className: se existir uma thumbnail(preview), poe a classe has-thumbnail se não nada
//isso é pra tirar os pontilhados da label e a camera qando tiver uma preview