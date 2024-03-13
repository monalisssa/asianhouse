import React, {useContext, useEffect, useState} from 'react';
import {Button,  Container, Form,  ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import OrderTable from "../components/order/OrderTable";
import OrderSumTable from "../components/order/OrderSumTable";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {addOrder} from "../http/orderApi";
import MyAlert from "../components/MyAlert";
import {AddressSuggestions} from "react-dadata";
import {REST_API_KEY} from "../utils/consts";
import {fetchUser} from "../http/userApi";
import 'react-dadata/dist/react-dadata.css';

const PlacingOrder = observer(() => {

    const {basket, user} = useContext(Context)
    const [delivery, setDelivery] = useState("Доставка курьером")
    const [payment, setPayment] = useState("Оплата наличными")
    const [address, setAddress] = useState("")
    const [name, setName] = useState('')
    const [tel, setTel] = useState('')
    const [comment, setComment] = useState("")

    const [showAlert, setShowAlert] = useState(false);
    const [validated, setValidated] = useState();

    useEffect(() => {
        fetchUser(user.user.user_id).then(data => {
            if (data.userInfo !== null) {
                if(data.userInfo.firstname != null) setName(data.userInfo.firstname);
                if(data.userInfo.tel != null) setTel(data.userInfo.tel);
            } else {
                setTel('');
                setName('');
            }
        })
    }, [user])


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        event.preventDefault();
        setValidated(true);
        if(form.checkValidity() === true)
        {
            if(address === "") alert("Необходимо ввести адрес!")
            else placeOrder();
        }

    };

    const placeOrder = () => {

        if (user.isAuth) {
            addOrder(user.user.user_id, name, tel, payment, address.value, delivery, comment, basket.sum).then(data => console.log(data))
            setShowAlert(true)
        }
    }


    return (

        <Container className="mt-4" >
            <h5 className="fs-5" style={{ color: "#ccc" }}>Главная / Оформление заказа</h5>
                <Container style={{ backgroundColor: "rgb(255,255,255,0.8)"}} className="p-3 position-relative"  >

                    <div className="d-flex flex-column m-4" style={{maxWidth: "40rem"}}>
                        <OrderTable />

                        <Container className="d-flex flex-column gap-2 basket-list p-3" style={{backgroundColor: "#fff", borderRadius: "15px"}}>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <h5>Доставка</h5>
                                <ToggleButtonGroup
                                    type="radio"
                                    value={delivery || "Доставка курьером"}
                                    name="deliveryOptions"
                                    defaultValue={"Доставка курьером"}
                                    onChange={setDelivery}>
                                    <ToggleButton id="tbg-radio-1" value={"Доставка курьером"}>
                                        Доставка курьером
                                    </ToggleButton>
                                    <ToggleButton id="tbg-radio-2" value={"Доставка самовывозом"}>
                                        Доставка самовывозом
                                    </ToggleButton>
                                </ToggleButtonGroup>

                                <h5 className="mt-3">Адрес</h5>

                                <Container className="d-flex flex-column w-100">
                                    <AddressSuggestions
                                        token={REST_API_KEY}
                                        value={address}
                                        onChange={setAddress}
                                        hintText={"Введите Адрес"}
                                        filterLocations={[{ "country": "Беларусь", "city" : "Минск"}]}
                                        filterRestrictValue={true}
                                    />
                                </Container>


                                <h5 className="mt-4">Оплата</h5>
                                <ToggleButtonGroup
                                    type="radio"
                                    name="PaymentOptions"
                                    value={payment || "Оплата наличными"}
                                    defaultValue={"Оплата наличными"}
                                    onChange={setPayment}>
                                    <ToggleButton id="tbg-radio-11" value={"Оплата наличными"}>
                                        Оплата наличными
                                    </ToggleButton>
                                    <ToggleButton id="tbg-radio-22" value={"Оплата банковской картой"}>
                                        Оплата банковской картой
                                    </ToggleButton>
                                    <ToggleButton id="tbg-radio-33" value={"Оплата online на сайте"}>
                                        Оплата online на сайте
                                    </ToggleButton>
                                </ToggleButtonGroup>
                                <h5 className="mt-4">Ваши данные</h5>

                                <div className="d-flex gap-4">

                                    <Form.Group className="mb-3 w-50 " controlId="exampleForm.ControlInput1">
                                        <Form.Control
                                            required
                                            placeholder="Имя"
                                            size="lg"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            pattern="^[а-яёА-ЯЁ\s]+$"/>
                                        <Form.Control.Feedback type="invalid">Имя должно содержать русские буквы!</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="validationCustom05">

                                        <Form.Control
                                            required
                                            value={tel}
                                            onChange={e => setTel(e.target.value)}
                                            type="tel"
                                            size="lg"
                                            pattern="\+375 \(\d{2}\) \d{3}-\d{2}-\d{2}"
                                        />
                                        <Form.Control.Feedback type="invalid">Пример: +375 (33) 605-20-51</Form.Control.Feedback>
                                    </Form.Group>
                                </div>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Комментарий к заказу</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={comment}
                                        onChange={e => setComment(e.target.value)}/>
                                </Form.Group>

                                <Button className="basket-btn w-50 mt-4" style={{backgroundColor: "#FF6347"}} type="submit">Оформить заказ</Button>

                            </Form>
                        </Container>

                        <OrderSumTable sum={basket.sum} />
                    </div>



                </Container>

            {showAlert && <MyAlert show = {showAlert} setShow = {setShowAlert}/>}
        </Container>

    );
});

export default PlacingOrder;