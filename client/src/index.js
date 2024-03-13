import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import MenuStore from "./store/MenuStore";
import BasketStore from "./store/BasketStore";
import OrderStore from "./store/OrderStore";


export const Context = createContext(null)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Context.Provider value={
        {
            user: new UserStore(),
            basket: new BasketStore(),
            menu: new MenuStore(),
            order: new OrderStore()

        }
    }>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Context.Provider>,

);



