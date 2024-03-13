import React, {useContext, useEffect} from 'react';
import {Card, Col, Row} from "react-bootstrap";
import {BsFillBasket3Fill} from "react-icons/bs";
import {PiBowlFoodFill} from "react-icons/pi";
import {GrMoney} from "react-icons/gr";
import {Context} from "../../../index";
import {fetchOrders} from "../../../http/orderApi";
import {observer} from "mobx-react-lite";
import {fetchBasketItems} from "../../../http/basketApi";

const ProfileInfo = observer(() => {

    const {order, user, basket} = useContext(Context)
    
    useEffect(() => {
        fetchOrders(user.user.user_id).then(data =>order.setOrders(data))
        fetchBasketItems(user.user.user_id).then(data => {
                basket.setBasketItems(data)

            }
        )

    }, [basket, order, user]);
    return (
        <Row className="d-flex gap-4">
            <Col >
                <Card  style={{ width: '10rem', borderRadius: "25px", backgroundColor: "transparent"}} className="d-flex flex-row align-items-center p-3 gap-3 border-0">

                    <BsFillBasket3Fill size={45}/>
                    <div className="d-flex flex-column align-items-center">
                        Заказы
                        <h5 className="fw-bold">  {order.orders.length}</h5>
                    </div>
                </Card>
            </Col>
            <Col>
                <Card  style={{ width: '10rem', borderRadius: "25px", backgroundColor: "transparent" }} className="d-flex flex-row align-items-center p-3 gap-3 border-0">

                    <PiBowlFoodFill size={45} />
                    <div className="d-flex flex-column align-items-center">
                         Корзина
                        <h5 className="fw-bold"> {basket.basketItems.basketItemList != null && basket.basketItems.basketItemList.reduce((accumulator, currentItem) =>
                            accumulator + currentItem.quantity, 0)}</h5>
                    </div>

                </Card>
            </Col>
            <Col>
                <Card  style={{ width: '10rem', borderRadius: "25px" , backgroundColor: "transparent"}} className="d-flex flex-row align-items-center p-3 gap-3 border-0">

                    <GrMoney size={35}/>
                    <div className="d-flex flex-column align-items-center">
                        Потрачено
                        <h5 className="fw-bold"> {order.orders.reduce((sum, item) => sum + item.sum, 0).toFixed(2)}</h5>

                    </div>

                </Card>
            </Col>
        </Row>
    );
});

export default ProfileInfo;