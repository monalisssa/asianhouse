import React, {useContext, useEffect} from 'react';
import {Card, Col, Row} from "react-bootstrap";
import {FaUserAlt} from "react-icons/fa";
import {PiBowlFoodFill} from "react-icons/pi";
import {BsFillBasket3Fill} from "react-icons/bs";
import {GrMoney} from "react-icons/gr";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {fetchAllUsers} from "../../http/userApi";


const AdminMainInfo = observer(() => {

    const {order, user, menu} = useContext(Context)

    useEffect(() => {
        fetchAllUsers().then(data =>  user.setAllUsers(data.filter(item => item.role === "ROLE_USER")))
    },[ user])
    return (
        <Row className="mt-4">
            <Col >
                <Card  style={{ width: '10rem', borderRadius: "25px", backgroundColor: "transparent"}} className="d-flex flex-row align-items-center p-3 gap-3 border-0">

                    <BsFillBasket3Fill size={65}/>
                    <div className="d-flex flex-column align-items-center">
                        Заказы
                        <h5 className="fw-bold">  {order.all_orders.length}</h5>
                    </div>
                </Card>
            </Col>
            <Col>
                <Card  style={{ width: '10rem', borderRadius: "25px", backgroundColor: "transparent" }} className="d-flex flex-row align-items-center p-3 gap-3 border-0">

                    <PiBowlFoodFill size={65} />
                    <div className="d-flex flex-column align-items-center">
                        Блюда
                        <h5 className="fw-bold"> {menu.all_items.length}</h5>

                    </div>

                </Card>
            </Col>
            <Col>
                <Card  style={{ width: '10rem', borderRadius: "25px", backgroundColor: "transparent" }} className="d-flex flex-row align-items-center p-3 gap-3 border-0">


                    <FaUserAlt size={50}/>
                    <div className="d-flex flex-column align-items-center">
                        Клиенты
                        <h5 className="fw-bold"> {user.all_users.length}</h5>

                    </div>

                </Card>

            </Col>
            <Col>
                <Card  style={{ width: '10rem', borderRadius: "25px" , backgroundColor: "transparent"}} className="d-flex flex-row align-items-center p-3 gap-3 border-0">

                    <GrMoney size={50}/>
                    <div className="d-flex flex-column align-items-center">
                        Продажи
                        <h5 className="fw-bold"> {order.all_orders.reduce((sum, item) => sum + item.sum, 0).toFixed(2)}</h5>

                    </div>

                </Card>
            </Col>
        </Row>
    );
});

export default AdminMainInfo;