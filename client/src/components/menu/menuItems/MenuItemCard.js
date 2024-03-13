import React from 'react';
import {Button, Card} from "react-bootstrap";
import {FaPepperHot} from "react-icons/fa";

const MenuItemCard = ({item, addToBasket, click}) => {
    return (
            <Card style={{ width: '16rem', borderRadius: "10%", backgroundColor: "transparent"}} className="card-item p-0 border-0 ">
                <Card.Img variant="top" src={"data:image/png;base64," + item.image} style={{borderRadius: "10%"}} onClick={() => click(item)}/>
                <Card.Body>

                    <Card.Title className="fs-5 d-flex justify-content-between" style={{ fontWeight: "bolder" }}>
                        <Card.Text> {item.name}</Card.Text>
                        {
                            item.menuItemInfo.is_spicy ? <Card.Text><FaPepperHot /> </Card.Text>
                                : <Card.Text> </Card.Text>
                        }

                    </Card.Title>

                    <Card.Text className="d-flex justify-content-between" >
                        <div className="price">
                            {item.price} <sup>руб.</sup>
                        </div>
                        <div className="pt-2 fs-5" style={{color: "#848482"}}>
                            {item.weight} г.
                        </div>
                    </Card.Text>

                </Card.Body>
                <Button variant="danger" className="button-card fs-5 border-0 " onClick={() => addToBasket(item)}>Добавить в корзину</Button>
            </Card>

    );
};

export default MenuItemCard;