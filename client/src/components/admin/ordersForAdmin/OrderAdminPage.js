import React, {useContext, useEffect, useState} from 'react';
import {Col, Dropdown, Form, Row} from "react-bootstrap";
import AdminBar from "../AdminBar";
import OrderAdminTable from "./OrderAdminTable";
import {MDBCol, MDBIcon} from "mdb-react-ui-kit";
import {observer} from "mobx-react-lite";
import {fetchAllOrders} from "../../../http/orderApi";
import {Context} from "../../../index";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

const OrderAdminPage = observer((state) => {

    const [searchValue, setSearchValue] = useState("");
    const [status, setStatus] = useState("")

    const [filter, setFilter] = useState(false)
    const [delivery, setDelivery] = useState("")
    const [payment, setPayment] = useState("")
    const {order} = useContext(Context)
    const [startDate, setStartDate] = useState("");

    const arrayStatus = ["Оформлен", "Подтверждён", "В пути", "Доставлен", "Отменён"]
    const arrayDelivery = ["Доставка курьером", "Доставка самовывозом"]
    const arrayPayment = ["Оплата банковской картой", "Оплата наличными", "Оплата на сайте"]


    useEffect(() => {
        if (filter) {
            
                fetchAllOrders().then(data =>  order.setAllOrders(data.filter(item => {
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
            fetchAllOrders().then(data => order.setAllOrders(data));
        }
    }, [filter, setFilter, delivery, payment, startDate, status]);

    useEffect(() => {
        if(searchValue === "") fetchAllOrders().then(data =>  order.setAllOrders(data))
    },[searchValue, setSearchValue])

    const searchOrder = () =>
    {
        order.setAllOrders(order.all_orders.filter(item => item.name === searchValue))
    }

    return (

        <Row className="p-3 gap-2">
            <Col md={3}>

                <AdminBar admin_menu = {state.admin_menu} admin_icons = {state.admin_icons}  setSelectedMenu = {state.setSelectedMenu} selectedMenu={state.selectedMenu}/>
                <MDBCol>
                    <form className="form-inline d-flex gap-2 justify-content-center mt-4" onSubmit={(e) => e.preventDefault()}>
                        <MDBIcon icon="search" onClick = {() => searchOrder()}/>
                        <input
                            className="form-control form-control-sm ml-3 w-75"
                            type="text"
                            placeholder="Введите имя пользователя"
                            aria-label="Search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    searchOrder();
                                }
                            }}
                        />
                    </form>
                </MDBCol>
                <h5 className="mt-4 mb-0 d-flex gap-2 align-items-center">
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
            </Col>

            <Col md={2}>
                <OrderAdminTable />
            </Col>

        </Row>
    );
});

export default OrderAdminPage;