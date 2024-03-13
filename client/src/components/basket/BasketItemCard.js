import React from 'react';
import {Button, Container} from "react-bootstrap";
import {MdDelete} from "react-icons/md";

const BasketItemCard = ({item, deleteItem, increaseQuantity, decreaseQuantity}) => {




    return (

            <Container className='d-flex align-items-center justify-content-between border-bottom pb-5'>
                <div className='d-flex align-items-center'>
                    <img
                        src={"data:image/png;base64," + item.menu_item.image}
                        alt=''
                        style={{ width: "8rem" }}
                        className="rounded-4"
                    />
                    <div className='ms-3'>
                        <p className='fw-bold mb-1'>{item.menu_item.name}</p>
                    </div>


                </div>


                <div className="d-flex gap-4 align-items-center">

                    <div className="price">
                        {item.menu_item.price} <sup>руб.</sup>
                    </div>
                    <Button style={{backgroundColor: "#FF6347"}} className="basket-btn" onClick={() => decreaseQuantity(item)}>-</Button>
                    {item.quantity}
                    <Button style={{backgroundColor: "#FF6347"}} onClick={() => increaseQuantity(item)} className="basket-btn">+</Button>

                    <MdDelete size={25} onClick={() => deleteItem(item)} style={{cursor: "pointer"}} className="delete-button"/>
                </div>


            </Container>
    );
};

export default BasketItemCard;