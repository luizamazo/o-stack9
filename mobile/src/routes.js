import { createAppContainer, createSwitchNavigator } from 'react-navigation';
//switchnavigator: quando usuario vai de uma tela pra outra a antiga deixa de existir só se tiver nova navegaçao pra antiga q ele consegue ver

import Login from './pages/Login';
import List from './pages/List';
import Book from './pages/Book';

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        List,
        Book
    })
);

export default Routes;