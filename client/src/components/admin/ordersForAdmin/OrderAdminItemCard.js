import React from 'react';
import {Accordion, Container} from "react-bootstrap";

const OrderAdminItemCard = ({item}) => {
    return (
        <Accordion.Body>
            <Container className='border-bottom p-0 d-flex flex-column align-items-center'>

                    <div>
                        <p className='fw-bold mb-1 fs-6'>{item.menu_item.name}</p>
                    </div>

                    <div>
                        <p className='fw-bold mb-1 fs-6'>{item.quantity} шт, {item.menu_item.price} руб</p>
                    </div>

            </Container>
        </Accordion.Body>
    );
};

export default OrderAdminItemCard;