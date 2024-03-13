import React from 'react';
import {Accordion, OverlayTrigger, Tooltip} from "react-bootstrap";
import {MDBBadge} from "mdb-react-ui-kit";
import { MdEdit} from "react-icons/md";
import OrderAdminItemCard from "./OrderAdminItemCard";


const OrderAdminCard = ({order, setOrderEdit, setEditStatusModalShow, index}) => {

    const date = new Date (order.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; //В js месяц с 0 идет, потому +1
    const day = date.getDate();

    const tooltip1 = (
        <Tooltip id="tooltip_1" className="fs-6">
            Клиент еще не подтвердил доставку заказа.
        </Tooltip>
    );

    const tooltip2 = (
        <Tooltip id="tooltip_2" className="fs-6">
            Клиент еще не оповещён отменой заказа.
        </Tooltip>
    );

    const editStatus = () =>
    {
        setOrderEdit(order)
        setEditStatusModalShow(true)
    }
    return (

        <tr className="fs-6 " style={{cursor: "pointer"}}>
            <th scope='row'>{index+1}</th>
            <td>
                <td style={{width: "8rem"}}>

                    <Accordion defaultActiveKey="1" >
                        <Accordion.Item eventKey="0" >
                            <Accordion.Header >Заказ</Accordion.Header>
                            {
                                order.orderItemList.map(item =>
                                    <OrderAdminItemCard key={item.id} item={item} />)
                            }


                        </Accordion.Item>

                    </Accordion>

                </td></td>
            <td>{order.sum} руб.</td>
            <td>
                <div>{order.deliveryType}</div>
                <div>{order.paymentType}</div>
            </td>
            <td>
                <div>{order.address}</div>
                <div>{day}/{month}/{year}</div>
            </td>
            <td>
                <div>{order.name}</div>
                <div>{order.tel}</div>
            </td>
            <td>{order.comment}</td>
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
                    <OverlayTrigger placement="top" className="fs-6" overlay={tooltip1}>
                        <MDBBadge color='warning' pill>
                            {order.status}
                        </MDBBadge>
                    </OverlayTrigger>


                }
                {
                    order.status === "Отменён" &&
                    <OverlayTrigger placement="top" className="fs-6" overlay={tooltip2}>
                        <MDBBadge color='danger' pill>
                            {order.status}
                        </MDBBadge>
                    </OverlayTrigger>



                }

            </td>

            <td>
                <MdEdit size={20} style={{cursor: "pointer"}}  className="delete-button" onClick={() => editStatus()}/>
            </td>

        </tr>




    );
};

export default OrderAdminCard;