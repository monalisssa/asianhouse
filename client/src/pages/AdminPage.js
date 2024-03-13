import React, {useContext, useEffect, useState} from 'react';
import { Col, Container, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import AdminBar from "../components/admin/AdminBar";
import {FaHome, FaUserAlt} from "react-icons/fa";
import {PiBowlFoodBold} from "react-icons/pi";
import {BsFillBasket3Fill} from "react-icons/bs";
import AdminMainInfo from "../components/admin/AdminMainInfo";
import MonthStatisticsOrder from "../components/statistics/MonthStatisticsOrder";
import {fetchCategories, fetchMenuItems} from "../http/menuApi";
import {Context} from "../index";
import {fetchAllOrders} from "../http/orderApi";
import {fetchAllUsers} from "../http/userApi";
import MenuAdminPage from "../components/admin/menuForAdmin/MenuAdminPage";
import OrderAdminPage from "../components/admin/ordersForAdmin/OrderAdminPage";
import UserAdminPage from "../components/admin/usersForAdmin/UserAdminPage";
import AdminProfile from "../components/admin/AdminProfile";
import {useFetching} from "../hooks/useFetching";


const AdminPage = observer(() => {

    const {order, user, menu} = useContext(Context)
    const admin_menu = ["Основная панель", "Меню", "Текущие заказы", "Пользователи"]
    const admin_icons  = [<FaHome />,<PiBowlFoodBold />,<BsFillBasket3Fill />, <FaUserAlt /> ]
    const [selectedMenu, setSelectedMenu] = useState("Основная панель");
    const handleSelectMenu = (selected_menu) => {
        setSelectedMenu(selected_menu)
    };

    useEffect(() => {
        fetchAllUsers().then(data =>  user.setAllUsers(data.filter(item => item.role === "ROLE_USER")))
        fetchAllOrders().then(data => order.setAllOrders(data))
        fetchMenuItems(null).then(data => menu.setAllItems(data))
        fetchCategories().then(data => {menu.setCategories(data)})
    },[menu, order, user])

    return (
            <Container className="mt-4">
                <Container style={{backgroundColor: "rgb(255,255,255,0.9)", borderRadius: "40px"}} className="d-flex flex-column p-4">
                    { selectedMenu === "Основная панель" &&
                        <Row className="p-3 gap-5">
                            <Col md={3} className="d-flex flex-column ">
                                <AdminBar admin_menu = {admin_menu} admin_icons = {admin_icons} selectedMenu = {selectedMenu} setSelectedMenu = {handleSelectMenu}/>
                                <AdminProfile />
                            </Col>
                            <Col md={8} className="d-flex flex-column gap-5">
                                <AdminMainInfo />
                                <MonthStatisticsOrder />
                            </Col>
                        </Row>
                    }

                    { selectedMenu === "Меню" &&
                        <MenuAdminPage admin_menu = {admin_menu} admin_icons = {admin_icons} selectedMenu = {selectedMenu} setSelectedMenu = {handleSelectMenu}/>
                    }

                    { selectedMenu === "Текущие заказы" &&
                        <OrderAdminPage admin_menu = {admin_menu} admin_icons = {admin_icons} selectedMenu = {selectedMenu} setSelectedMenu = {handleSelectMenu}/>
                    }

                    { selectedMenu === "Пользователи" &&
                        <UserAdminPage admin_menu = {admin_menu} admin_icons = {admin_icons} selectedMenu = {selectedMenu} setSelectedMenu = {handleSelectMenu}/>
                    }

                </Container>


            </Container>

    );
});

export default AdminPage;