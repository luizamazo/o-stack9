import React, { useState } from 'react';
import api from '../../services/api';

//history é utilizado pra fazer navegação

export default function Login({ history }){
    //estado = qualquer info q armazena num componente; é o data return do vuejs
    //useState retorna um vetor com duas posições, por isso desestruturação, do lado esquerdo um [], 
    //pois quer pegar os dois valores q a função retorna, q é o email e uma função chamada set email
    //ta uma string em branco pois é o valor inicial do input
    const [email, setEmail] = useState(''); 
    //email é o texto em branco mas vai retornar o valor desse estado de email em tempo real
    //toda vez q sofrer alteração, essa variavel email estará atualizada! a função setEmail é pra att o valor da variavel email
  
    async function handleSubmit(event){
    event.preventDefault(); //previna seu funcionamento padrão de enviar usuario pra outra tela
    
    const response = await api.post('/sessions', { //quando chegar nessa linha vai aguardar a finalização da chamada à api e quando receber resposta armazena no response
      email: email //posso deixar só um email já que chave é a mesma coisa q valor
    }) 
   
    const { _id } = response.data;

    localStorage.setItem('user', _id);

    history.push('/dashboard');
    
    }
    
    return (
        
        <>
            <p>
                Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
            </p>

            <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-MAIL *</label>
            <input 
                id="email" 
                type="email" 
                placeholder="Seu melhor-email"
                value={email}
                onChange={event => setEmail(event.target.value)} 
            />

            <button className="btn" type="submit">Entrar</button>
            </form>
            
        </>
    )
}

//ali em cima no OnChange: uma funçao que recebe um evento e seta o email com o valor recebido no input
// o react permite tag vazia chamada fragment, como se fosse div mas no final n aparece no html