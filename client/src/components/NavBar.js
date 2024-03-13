import React, {useContext} from 'react';
import {Context} from "../index";
import { Container, Nav, Navbar} from "react-bootstrap";
import "../styles/navbar.css"
import "../styles/main.css"
import profile_icon from "../static/profile_icon.png"
import basket_icon from "../static/basket_icon.png"
import admin_icon from "../static/admin_icon.png"
import "../styles/main.css"
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {ABOUT_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, MENU_ROUTE, MY_ORDERS_ROUTE} from "../utils/consts";
import logo from "../static/logo (3).png"
import BasketButton from "./basket/BasketButton";




const NavBar = observer(({setModalAuthShow, setModalBasketShow}) => {
    const {user, basket, menu} = useContext(Context)
    const navigate = useNavigate()

    const navToMenu = () =>
    {
        menu.setIsSelected(false)
        navigate(MENU_ROUTE)
    }

    const handleScrollToFooter = () => {
        const footerElement = document.getElementById("footer");
        if (footerElement) {
                footerElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className={"custom-navbar"}>
            <Navbar data-bs-theme="dark">
                <Container>

                    <Nav className="me-auto">
                        <Nav.Link  onClick={() =>navigate(MAIN_ROUTE)} ><img src={logo}/></Nav.Link>
                    </Nav>

                    <Nav className="me-auto fs-5"  >
                        <Nav.Link onClick={() => navToMenu()}>Меню</Nav.Link>
                        <Nav.Link href="#" onClick={() =>navigate(ABOUT_ROUTE)}>О нас</Nav.Link>
                        <Nav.Link href="#" onClick={handleScrollToFooter}>Контакты</Nav.Link>
                    </Nav>

                    {
                        user.isAuth ?
                            <Nav className="d-flex align-items-center gap-3" style={{marginRight: "-200px"}}>
                                {
                                    user.user.role_id === 1 ?
                                         <Nav.Link  onClick={() => navigate(ADMIN_ROUTE)} className="nav-button d-flex gap-2 align-items-center">
                                          <img src={admin_icon} width={50}/>
                                          Админ панель
                                         </Nav.Link>

                                        :
                                        <Nav.Link  onClick={() => navigate(MY_ORDERS_ROUTE)} className="nav-button d-flex gap-2 align-items-center">
                                            <img src={profile_icon} width={50}/>
                                            Мой профиль
                                        </Nav.Link>
                                }


                                {
                                    user.user.role_id === 2 &&
                                    <>
                                        { basket.basketItems.basketItemList!=null && basket.basketItems.basketItemList.length > 0 ?
                                            <BasketButton setModalBasketShow={setModalBasketShow}
                                                          className="nav-button"/>

                                            : <Nav.Link onClick={() => setModalBasketShow(true)} className="nav-button">
                                                <img src={basket_icon}/></Nav.Link>}
                                    </>

                                }
                            </Nav>
                            :

                            <Nav style={{marginRight: "-100px"}}>
                                <Nav.Link  className="nav-button d-flex gap-2 align-items-center"onClick={() => navigate(LOGIN_ROUTE)}>
                                    <img src={profile_icon} width={45}/>
                                    Войти
                                </Nav.Link>

                            </Nav>
                    }
                </Container>
            </Navbar>
        </div>
    );

}
)

export default NavBar;