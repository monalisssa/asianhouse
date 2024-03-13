import React from 'react';
import {observer} from "mobx-react-lite";
import {Button, Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {MENU_ROUTE} from "../utils/consts";

const Main = observer(() => {

    const navigate = useNavigate()
    const navigateToItem = () =>
    {
        navigate(MENU_ROUTE)
    }
    return (
        <Container style={{color: "#fff", textAlign: "center", width: "45rem"}} className="mt-5">

            <h1 style={{color: "#FF6347", fontSize: "50px"}}>НОВИНКА!</h1>

            <div style={{backgroundColor: "#fff", color: "#FF6347", borderRadius: "50px", fontWeight: "bold"}} className="fw-bold p-2 main-first-new mt-5">
                <h1>СКОРЕЕ УСПЕЙТЕ ПОПРОБОВАТЬ</h1>
            </div>

            <div style={{backgroundColor: "rgb(255,255,255,0.8)", color: "#FF6347", borderRadius: "50px", fontWeight: "bold"}} className="fw-bold p-2 main-second-new mt-5">
                <h1>НОВЫЙ РАМЁН С МОРЕПРОДУКТАМИ</h1>
            </div>

            <Button className="basket-btn w-50 mt-5 fs-4" style={{backgroundColor: "#FF6347", borderRadius: "50px"}} onClick={() => navigateToItem()}>Перейти к меню</Button>

        </Container>

    );
});

export default Main;