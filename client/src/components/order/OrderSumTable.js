import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const OrderSumTable = observer(({sum}) => {


    return (
        <Container className="d-flex flex-column gap-2 basket-list p-4 " style={{ backgroundColor: "#fff", borderRadius: "15px", maxWidth: "26rem", minHeight: "15rem", position: "fixed", right: "150px", top: "200px" }}>
            <h4 style={{ fontWeight: "bold" }}>Оплата</h4>
            <Row className="pb-3 mt-4" style={{ borderBottom: "1px solid #000" }}>
                <Col md={8} style={{ fontSize: "17px" }}>Сумма заказа</Col>
                <Col>
                    <div className="price" style={{ fontSize: "16px" }}>
                        {sum} <sup>руб.</sup>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col md={8}>Итого к оплате</Col>
                <Col>
                    <div className="price" style={{ fontSize: "18px" }}>
                        {sum} <sup>руб.</sup>
                    </div>
                </Col>
            </Row>
        </Container>

    );
});

export default OrderSumTable;