import React, {useContext} from 'react';
import {Container} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {deleteItem, editQuantity, fetchBasketItems} from "../../http/basketApi";
import OrderItemCard from "./OrderItemCard";


const OrderTable = observer(() => {

    const {basket, user} = useContext(Context)
    const deleteBasketItem = (item) =>
    {
        // eslint-disable-next-line no-unused-expressions
        deleteItem(item.id).then(data => fetchBasketItems(user.user.user_id).then(data => basket.setBasketItems(data)));
    }

    const increaseQuantity = (item) =>
    {
        const newQuantity = item.quantity + 1
        console.log(item.quantity + 1)
        editQuantity(item.id, newQuantity).then(data => fetchBasketItems(user.user.user_id).then(data => basket.setBasketItems(data)))
    }

    const decreaseQuantity = (item) =>
    {

        const newQuantity = item.quantity - 1
        if(newQuantity === 0)  deleteItem(item.id).then(data => fetchBasketItems(user.user.user_id).then(data => basket.setBasketItems(data)));
        else editQuantity(item.id, newQuantity).then((data) => fetchBasketItems(user.user.user_id).then(data => basket.setBasketItems(data)))
    }
    return (
        <Container className="d-flex flex-column gap-2 basket-list pt-3 mb-4" style={{backgroundColor: "#fff", borderRadius: "15px"}}>
            <h4>Ваш заказ</h4>
            { basket.basketItems.basketItemList!=null && basket.basketItems.basketItemList.length > 0 &&
                basket.basketItems.basketItemList.map(item =>

                    <OrderItemCard key={item.id} item={item} deleteItem={deleteBasketItem} increaseQuantity={increaseQuantity} decreaseQuantity ={decreaseQuantity}/>)

            }
        </Container>
    );
});

export default OrderTable;