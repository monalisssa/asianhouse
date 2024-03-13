import React, {useContext, useEffect, useState} from 'react';
import {Dropdown, Form} from "react-bootstrap";
import DatePicker from "react-datepicker";
import {Context} from "../../../index";
import {fetchOrders} from "../../../http/orderApi";
import {observer} from "mobx-react-lite";

const Filter = observer(() => {


    const [status, setStatus] = useState("")
    const [filter, setFilter] = useState(false)
    const [delivery, setDelivery] = useState("")
    const [payment, setPayment] = useState("")
    const {user, order} = useContext(Context)
    const [startDate, setStartDate] = useState("");

    const arrayStatus = ["Оформлен", "Подтверждён", "В пути", "Доставлен", "Отменён"]
    const arrayDelivery = ["Доставка курьером", "Доставка самовывозом"]
    const arrayPayment = ["Оплата банковской картой", "Оплата наличными", "Оплата online на сайте"]


    useEffect(() => {
        if (filter) {

            fetchOrders(user.user.user_id).then(data =>  order.setOrders(data.filter(item => {
                    const itemDate =  new Date(item.date)
                    return (
                        (item.deliveryType === delivery || delivery === '') &&
                        (item.paymentType === payment || payment === '') &&
                        (startDate === '' ||
                            (`${itemDate.getFullYear()}-${itemDate.getMonth() + 1}-${itemDate.getDate()}`
                                === `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`)) &&
                        (item.status === status || status === '')
                    );
                })
            ));
        } else {
            fetchOrders(user.user.user_id).then(data =>  order.setOrders(data));
        }
    }, [filter, setFilter, delivery, payment, startDate, status]);
    return (
        <>

        <h5 className="mt-5 mb-0 d-flex gap-2 align-items-center">
        Фильтрация
        <Form.Check // prettier-ignore
            type={"checkbox"}
            id={`default-checkbox`}
            value={filter}
            onChange={(e) => setFilter(e.target.checked)}
        />
        </h5>

         <Form className="d-flex flex-column gap-2 align-items-center-center">

         <div className="d-flex gap-2 align-items-center-center">
            <Dropdown className="w-100 mt-3 mb-3">
                <Dropdown.Toggle>

                    {
                        status || "Выберите статус"}</Dropdown.Toggle>
                <Dropdown.Menu>

                    {arrayStatus.map(st =>

                        <Dropdown.Item
                            onClick={() => setStatus(st)}
                            key={st.length}
                        >
                            {st}
                        </Dropdown.Item>
                    )}

                    {status && (
                        <Dropdown.Item onClick={() => setStatus('')}>
                            Отменить значение
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>

            <div className="fs-6 d-flex align-items-center" >
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    isClearable
                    placeholderText="Дата не выбрана"
                />
            </div>
           </div>

        <Dropdown>
            <Dropdown.Toggle style={{width: "18rem"}}>
                {payment || "Выберите оплату"}
            </Dropdown.Toggle >
            <Dropdown.Menu style={{width: "18rem"}}>
                {arrayPayment.map(pm => (
                    <Dropdown.Item onClick={() => setPayment(pm)} key={pm.length}>
                        {pm}
                    </Dropdown.Item>
                ))}
                {payment && (
                    <Dropdown.Item onClick={() => setPayment('')}>
                        Отменить значение
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>

        <Dropdown className="mt-3">
            <Dropdown.Toggle style={{width: "18rem"}}>
                {delivery || "Выберите доставку"}
            </Dropdown.Toggle>
            <Dropdown.Menu style={{width: "18rem"}}>
                {arrayDelivery.map(del => (
                    <Dropdown.Item onClick={() => setDelivery(del)} key={del.length}>
                        {del}
                    </Dropdown.Item>
                ))}
                {delivery && (
                    <Dropdown.Item onClick={() => setDelivery('')}>
                        Отменить значение
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>

    </Form>

        </>
    );
});

export default Filter;