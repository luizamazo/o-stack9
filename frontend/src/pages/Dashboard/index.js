import React, { useEffect, useState } from 'react'; //useEffect é basicamente uma função
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

export default function Dashboard(){
    
    const [spots, setSpots] = useState([]); //tem q sempre pensar qal formato q eh inicializado, q vc espera

    //primeiro param é uma função, o segundo é um array de dependencias: quando quero q a primeira func execute?    
    //no array pode haver varias variaveis que quando sofrerem atts essa funçao ira executar de novo do 0
    useEffect(() => {
        async function loadSpots(){
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id } //passo o user_id como param para a rota dashboard
            });
            
            setSpots(response.data);
        }
    
        loadSpots();

    }, []); //poderia passar [filter] q ai toda vez q filtro alterar ele executa novamente; array vazio -> exec 1 unica vez 
    
    return (
        <>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$ ${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
               <button className="btn">Cadastrar Novo Spot</button>
            </Link>
        </>
    )
}
// {{ }} primeira chave indica q quero incluir codigo javascript no html e a segunda chave indica que to colocando um objeto dentro
//acima to fazendo com css mesmo por q é uma header, passo então o url q peguei la do back
// o if ternario ali: se price presente (true), é RS preço/dia se n, 