import React, {useContext,  useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {Context} from "../index";

import OrderInfoTable from "../components/profile/myOrders/OrderInfoTable";
import UserOrderStatistics from "../components/statistics/UserOrderStatistics";

import {FaUser} from "react-icons/fa";

import {BsFillBasket3Fill} from "react-icons/bs";
import ProfileBar from "../components/profile/ProfileBar";
import MyAccount from "../components/profile/myAccount/MyAccount";
import ProfileInfo from "../components/profile/myAccount/profileInfo";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {MAIN_ROUTE} from "../utils/consts";
import Filter from "../components/profile/myOrders/Filter";

const Profile = observer(() => {


    const {user} = useContext(Context)
    const navigate = useNavigate()
    const user_menu = ["Мой профиль", "Мои заказы"]
    const user_icons  = [<FaUser />,<BsFillBasket3Fill />]
    const [selectedMenu, setSelectedMenu] = useState("Мой профиль");

    const handleSelectMenu = (selected_menu) => {
        setSelectedMenu(selected_menu)
    };

    const exit = () => {
        user.setIsAuth(false)
        navigate(MAIN_ROUTE)
    };
    return (
        <Container className="mt-4" >
            <h5 className="fs-5" style={{ color: "#ccc" }}>Главная / {selectedMenu}</h5>
            <Container style={{backgroundColor: "rgb(255,255,255,0.9)", borderRadius: "40px"}} className="d-flex flex-column gap-5 p-3">

                <Row className="p-3 gap-4">
                    <Col md={3} className="d-flex flex-column ">
                        <ProfileBar user_menu = {user_menu} user_icons = {user_icons} selectedMenu = {selectedMenu} setSelectedMenu = {handleSelectMenu}/>

                        {
                            selectedMenu === "Мои заказы" && <Filter />
                        }
                        {
                            selectedMenu === "Мой профиль" &&
                            <Button className="nav-button mt-5"  onClick={() => exit()}>Выйти</Button>

                        }

                    </Col>
                    <Col md={8} className="d-flex flex-column gap-5">

                        {
                            selectedMenu === "Мои заказы" &&
                            <div>
                                <div className="d-flex flex-column gap-2 align-items-center mt-3">
                                    <h5 className="fw-bold">История моих заказов</h5>
                                    <OrderInfoTable/>
                                </div>

                                <h5 className="fw-bold d-flex flex-column align-items-center mt-5">Статистика заказов, исходя из моих предпочтений</h5>
                                <UserOrderStatistics />

                            </div>
                        }


                        {
                            selectedMenu === "Мой профиль" &&
                           <div className="d-flex flex-column justify-content-center">
                               <MyAccount />
                               <ProfileInfo />
                           </div>

                        }



                    </Col>
                </Row>
             </Container>


        </Container>

    );
});

export default Profile;