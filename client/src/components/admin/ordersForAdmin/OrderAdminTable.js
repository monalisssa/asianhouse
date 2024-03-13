import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {MDBTable, MDBTableBody, MDBTableHead} from "mdb-react-ui-kit";
import OrderAdminCard from "./OrderAdminCard";
import ModalEditOrderStatus from "./modals/ModalEditOrderStatus";
import {fetchAllOrders} from "../../../http/orderApi";

const OrderAdminTable = observer(() => {
    const {order} = useContext(Context)

    const [editStatusModalShow, setEditStatusModalShow] = useState(false);
    const [orderEdit, setOrderEdit] = useState({});

    useEffect(() => {
       fetchAllOrders().then(data =>  order.setAllOrders(data))
    },[editStatusModalShow,setEditStatusModalShow])
    return (

        <>
            <MDBTable hover align="middle" style={{width: "57rem", borderRadius: "10px"}}>
                <MDBTableHead>
                    <tr className="fs-6">
                        <th scope='col'>#</th>
                        <th scope='col'>Заказ</th>
                        <th scope='col'>Сумма</th>
                        <th scope='col'>Доставка, Оплата</th>
                        <th scope='col'>Адрес, Дата</th>
                        <th scope='col'>Имя, Телефон</th>
                        <th scope='col'>Комментарий</th>
                        <th scope='col'>Статус</th>
                        <th scope='col'></th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {
                        order.all_orders.filter(item => item.comment !== "Доставка подтверждена пользователем!" && item.comment !== "Пользователь был оповещён отменой заказа!")
                            .map((item,index) =>

                                <OrderAdminCard order={item} setOrderEdit={setOrderEdit}
                                                setEditStatusModalShow={setEditStatusModalShow} index={index}/>

                        )
                    }

                </MDBTableBody>

            </MDBTable>

            {
                editStatusModalShow && <ModalEditOrderStatus show={editStatusModalShow} onHide={setEditStatusModalShow} order = {orderEdit}/>
            }

        </>

    );
})

export default OrderAdminTable;