import React, {useContext} from 'react';
import {Routes, Route} from 'react-router-dom'

import Main from "../pages/Main";
import {
   ABOUT_ROUTE,
    ADMIN_ROUTE,
    BASKET_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    MENU_ROUTE, MY_ORDERS_ROUTE,
    PLACING_ORDER_ROUTE,
    REGISTRATION_ROUTE
} from "../utils/consts";
import {Context} from "../index";
import Menu from "../pages/Menu";
import BasketModalWindow from "./basket/BasketModalWindow";
import PlacingOrder from "../pages/PlacingOrder";
import Profile from "../pages/Profile";
import AdminPage from "../pages/AdminPage";
import AuthPage from "../pages/AuthPage";
import {observer} from "mobx-react-lite";
import About from "../pages/About";
const AppRouter = observer(({modalBasketShow, setModalBasketShow}) => {

    const {user} = useContext(Context)


    return (
        <>
            <Routes>
                {
                    user.isAuth &&
                    <>
                    <Route path={BASKET_ROUTE} element={<BasketModalWindow/>} exact/>
                    <Route path={PLACING_ORDER_ROUTE} element={<PlacingOrder/>} exact/>
                    <Route path={MY_ORDERS_ROUTE} element={<Profile />} exact/>
                    <Route path={ADMIN_ROUTE} element={<AdminPage />} exact/>
                    </>

                }
                <Route path={LOGIN_ROUTE} element={<AuthPage />} exact/>
                <Route path={REGISTRATION_ROUTE} element={<AuthPage />} exact/>
                <Route path={MAIN_ROUTE} element={<Main />} exact/>
                <Route path={MENU_ROUTE} element={<Menu />} exact/>
                <Route path={ABOUT_ROUTE} element={<About />} exact/>

            </Routes>


              {modalBasketShow &&   <BasketModalWindow modalBasketShow={modalBasketShow} setModalBasketShow={setModalBasketShow}/>}

            </>

    );
});

export default AppRouter;