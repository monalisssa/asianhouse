import React, {useEffect, useState} from "react";
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import { editStatusOrder} from "../../../../http/orderApi";

const ModalEditOrderStatus = ({show, onHide,  order}) => {
    const [status, setStatus] = useState("")
    const [arrayStatus, setArrayStatus] = useState([])


    useEffect(() => {
        if(order.status === "Оформлен") setArrayStatus(["Подтверждён", "Отменён"])
        if(order.status === "Подтверждён") setArrayStatus(["В пути", "Отменён"])
        if(order.status === "В пути") setArrayStatus(["Доставлен", "Отменён"])
    }, []);

    const editStatus = () =>
    {
        editStatusOrder(order.id, status).then(data => {
            onHide()
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить статус заказа
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>

                            {
                                status || "Выберите статус заказа"}</Dropdown.Toggle>
                        <Dropdown.Menu>

                            {arrayStatus.map(st =>

                                <Dropdown.Item
                                    onClick={() => setStatus(st)}
                                    key={st.length}
                                >
                                    {st}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={() => onHide()}>Закрыть</Button>
                <Button variant="outline-success" onClick={() => editStatus()}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEditOrderStatus;