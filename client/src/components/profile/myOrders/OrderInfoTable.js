import React, {useContext, useEffect} from 'react';
import { MDBTable, MDBTableBody, MDBTableHead} from "mdb-react-ui-kit";
import {Context} from "../../../index";
import OrderCard from "./OrderCard";
import {fetchOrders} from "../../../http/orderApi";
import {observer} from "mobx-react-lite";


const OrderInfoTable = observer(() => {
    const {order, user} = useContext(Context)
    
    useEffect(() => {
        fetchOrders(user.user.user_id).then(data => { order.setOrders(data);
            order.setIsLoad(true)
        })

    }, [order, user.user.user_id]);

    return (

            <MDBTable hover align='middle' style={{width: "45rem", borderRadius: "10px"}} className="fs-6 m-auto">

                <MDBTableHead>
                    <tr className="fs-6">
                        <th scope='col'>#</th>
                        <th scope='col'>Заказ</th>
                        <th scope='col'>Сумма</th>
                        <th scope='col'>Доставка, Оплата</th>
                        <th scope='col'>Адрес, Дата</th>
                        <th scope='col'>Статус</th>
                    </tr>
                </MDBTableHead>

                <MDBTableBody>
                    {
                        order.isLoad &&
                        order.orders.map((item, index) =>
                            <OrderCard key={item.id} order={item} index={index} />
                        )
                    }
                </MDBTableBody>
            </MDBTable>

    );
});

export default OrderInfoTable;