import React, {useContext} from 'react';
import {Button, Container, Modal} from "react-bootstrap";
import {Context} from "../../index";
import BasketItemCard from "./BasketItemCard";
import {observer} from "mobx-react-lite";
import {deleteAll, deleteItem, editQuantity, fetchBasketItems} from "../../http/basketApi";
import basket_empty from "../../static/empty_basket.png"
import {NavLink, useNavigate} from "react-router-dom";
import {MENU_ROUTE, PLACING_ORDER_ROUTE} from "../../utils/consts";


const BasketModalWindow = observer(({modalBasketShow, setModalBasketShow}) => {


    const {basket, user} = useContext(Context)
    const navigate = useNavigate()


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

    const deleteAllItems = () =>
    {
        deleteAll(user.user.user_id).then(data => fetchBasketItems(user.user.user_id).then(data => basket.setBasketItems(data)));
    }

    const navigateToPlacingOrder = () =>
    {
           setModalBasketShow(false)
           navigate(PLACING_ORDER_ROUTE)
    }
    return (

        <Modal className="modal-basket "
               size="lg"
               show={modalBasketShow}
               onHide={() => setModalBasketShow(false)}
               aria-labelledby="example-mosdal-sizes-title-lg"
        >

            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Корзина
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="pb-0">

                <Container className="d-flex flex-column gap-5 mt-4 basket-list">

                        { basket.basketItems.basketItemList != null && basket.basketItems.basketItemList.length > 0 &&
                            basket.basketItems.basketItemList.map(item =>

                                <BasketItemCard key={item.id} item={item} deleteItem={deleteBasketItem} increaseQuantity={increaseQuantity} decreaseQuantity ={decreaseQuantity}/>)

                        }

                    { basket.basketItems.basketItemList != null && basket.basketItems.basketItemList.length === 0 &&

                        <Container className="d-flex flex-column justify-content-center align-items-center mb-5">
                            Ваша корзина пуста...
                            <img src={basket_empty} width={200}/>
                            <NavLink to={MENU_ROUTE} onClick={() =>  setModalBasketShow(false)} style={{color: "#FF6347"}}>Просмотреть меню</NavLink>
                        </Container>

                    }


                </Container>

            </Modal.Body>

            <Modal.Footer className="d-flex justify-content-between">
                { basket.basketItems.basketItemList != null &&

                    <div className="d-flex align-items-center gap-3">
                        Общая сумма:
                        <div className="price">

                            {basket.sum} <sup>руб.</sup>
                        </div>
                    </div>

                }
                <div className="d-flex gap-4">
                    <Button onClick={() => deleteAllItems()} className="basket-btn" style={{backgroundColor: "#FF6347"}}>Очистить корзину</Button>

                    { basket.basketItems.basketItemList != null && basket.basketItems.basketItemList.length === 0 &&

                        <Button
                            disabled
                            className="basket-btn"
                            style={{backgroundColor: "#FF6347"}}>Оформить заказ
                        </Button>


                    }

                    { basket.basketItems.basketItemList != null && basket.basketItems.basketItemList.length !== 0 &&

                        <Button
                            className="basket-btn"
                            style={{backgroundColor: "#FF6347"}}
                            onClick={() => navigateToPlacingOrder()}>Оформить заказ
                        </Button>

                    }




                </div>

            </Modal.Footer>
        </Modal>

    );
})

export default BasketModalWindow;