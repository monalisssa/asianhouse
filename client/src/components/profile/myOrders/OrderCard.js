import React, {useState} from 'react';
import {Accordion,  OverlayTrigger, Tooltip} from "react-bootstrap";
import {MDBBadge} from "mdb-react-ui-kit";
import OrderItemCard from "./OrderItemCard";
import {FaCheckCircle} from "react-icons/fa";
import {editComment} from "../../../http/orderApi";

const OrderCard = ({order, index}) => {

    const date = new Date (order.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; //В js месяц с 0 идет, потому +1
    const day = date.getDate();

    const [confirmStatus1State, setConfirmStatus1State] = useState(false)
    const [confirmStatus2State, setConfirmStatus2State] = useState(false)
    const tooltip1 = (
        <Tooltip id="tooltip_3" className="fs-6">
            Нажмите для подтверждения доставки заказа.
        </Tooltip>
    );

    const tooltip2 = (
        <Tooltip id="tooltip_4" className="fs-6">
            Нажмите для подтверждения отмены заказа (сообщение об отмене дошло до вас).
        </Tooltip>
    );

    const confirmStatus1 = () =>
    {
        alert("Доставка подтверждена!")
        editComment(order.id, "Доставка подтверждена пользователем!")
        setConfirmStatus1State(true)

    }

    const confirmStatus2 = () =>
    {
        alert("Вы были оповещены отменой заказа!")
        editComment(order.id, "Пользователь был оповещён отменой заказа!")
        setConfirmStatus2State(true)
    }
    return (
        <tr>
            <td>{index+1}</td>
            <td style={{width: "8rem"}}>

                    <Accordion defaultActiveKey="1" >
                        <Accordion.Item eventKey="0" style={{width: "8rem"}} >
                            <Accordion.Header >Заказ</Accordion.Header>
                            {
                                order.orderItemList.map(item =>
                                    <OrderItemCard key={item.id} item={item} />)
                            }


                        </Accordion.Item>

                    </Accordion>

            </td>
            <td>
                <p className='fw-normal mb-1'>{order.sum} руб.</p>
            </td>
            <td>
                <div>{order.deliveryType}</div>
                <div>{order.paymentType}</div>
            </td>
            <td>
                <div>{order.address}</div>
                <div>{day}/{month}/{year}</div>
            </td>
            <td>
                {
                    order.status === "Оформлен" &&   <MDBBadge color='secondary' pill>
                        {order.status}
                    </MDBBadge>

                }

                {
                    order.status === "Подтверждён" &&   <MDBBadge color='success' pill>
                        {order.status}
                    </MDBBadge>

                }

                {
                    order.status === "В пути" &&   <MDBBadge color='primary' pill>
                        {order.status}
                    </MDBBadge>

                }

                {
                    order.status === "Доставлен" &&
                    <div className="d-flex align-items-center gap-4">
                        <MDBBadge color='warning' pill>
                            {order.status}
                        </MDBBadge>

                        {order.comment !== "Доставка подтверждена пользователем!" && !confirmStatus1State &&
                            < OverlayTrigger placement="top" className="fs-6" overlay={tooltip1}>
                            <FaCheckCircle  style={{cursor: "pointer"}}  className="delete-button" size={25} onClick={() => confirmStatus1()}/>
                            </OverlayTrigger>
                        }
                    </div>

                }
                {
                    order.status === "Отменён" &&

                    <div className="d-flex align-items-center gap-4">
                        <MDBBadge color='danger' pill>
                            {order.status}
                        </MDBBadge>
                        {order.comment !== "Пользователь был оповещён отменой заказа!" && !confirmStatus2State &&
                            <OverlayTrigger placement="top" className="fs-6" overlay={tooltip2}>
                                <div>
                                    <FaCheckCircle  style={{cursor: "pointer"}}  className="delete-button" size={25} onClick={() => confirmStatus2()} />
                                </div>
                            </OverlayTrigger>
                        }
                    </div>
                }
            </td>
        </tr>
    );
};

export default OrderCard;