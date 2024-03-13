import React from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {MdDelete} from "react-icons/md";

const OrderItemCard = ({item, deleteItem, increaseQuantity, decreaseQuantity}) => {
    return (
        <Row className='d-flex align-items-center justify-content-between border-bottom pb-3'>


                <Col md={7}>
                    <div className='d-flex align-items-center'>
                        <img
                            src={"data:image/png;base64," + item.menu_item.image}
                            alt=''
                            style={{ width: "4rem" }}
                            className="rounded-4"
                        />
                        <div className='ms-3'>
                            <p className='fw-bold mb-1'>{item.menu_item.name}</p>
                        </div>

                    </div>
                </Col>
                <Col md={4}>
                    <div className="d-flex gap-2 align-items-center">

                        <Button style={{backgroundColor: "#FF6347", scale: "0.7"}} className="basket-btn" onClick={() => decreaseQuantity(item)} >-</Button>
                        {item.quantity}

                        <Button style={{backgroundColor: "#FF6347", scale: "0.7"}} onClick={() => increaseQuantity(item)} className="basket-btn" >+</Button>
                        <div className="price" style={{fontSize: "18px"}}>
                            {item.menu_item.price} <sup>руб.</sup>
                        </div>

                    </div>
                </Col>

            <Col md={1}>
                <MdDelete size={20} onClick={() => deleteItem(item)} style={{cursor: "pointer"}} className="delete-button"/>
            </Col>





        </Row>
    );
};

export default OrderItemCard;