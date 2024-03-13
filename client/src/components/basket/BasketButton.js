import React, {useContext} from 'react';
import {Button} from "react-bootstrap";
import basket_icon from "../../static/basket_icon.png";
import {Context} from "../../index";




const BasketButton = ({setModalBasketShow}) => {


    const {basket} = useContext(Context)
    return (
        <Button style={{backgroundColor: "#FF6347"}} onClick={() => setModalBasketShow(true)} className="d-flex align-items-center basket-btn gap-2 nav-button ">
            <img src={basket_icon} width={30} />
            <span style={{fontWeight: "bold"}}>
               {basket.basketItems.basketItemList.reduce((accumulator, currentItem) =>
                   accumulator + currentItem.quantity, 0)}

            </span>
            блюдо на сумму
            <span style={{fontWeight: "bold"}}>{basket.sum}</span>
            руб
        </Button>
    );
};

export default BasketButton;