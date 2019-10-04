import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import New from './pages/New';

//comportamento padrão do router no react deixa mais de uma rota ser chamada ao mesmo tempo
//switch garante que apenas uma rota seja executada por vez, nunca 2 ao mesmo tempo
//mas a primeira rota tem q ser mudada pq o react router dom n faz verificaçao de igualdade
//pra saber se o path é igual ao que tá em cima
//como a primeira é '/' ele verificaria se a rota contem o /, então chamaria todas as outras rotas q tb tem o /
//por isso usa a propriedade exact pra só chamar essa rota se o caminho for exatamente apenas /
export default function Routes(){
    return (
        <BrowserRouter> 
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/New" component={New} />
            </Switch>
        </BrowserRouter>
    );
}