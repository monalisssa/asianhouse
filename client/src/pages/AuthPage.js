import React, {useContext, useState} from 'react';
import {Button, Container, Form, Row} from "react-bootstrap";

import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, MY_ORDERS_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {login, registration} from "../http/userApi";
import {observer} from "mobx-react-lite";

const AuthPage = observer(() => {

    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE

    const click = async (email,password) => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
                alert("Авторизация прошла успешно!")
            } else {
                data = await registration(email, password, 2);
                alert("Регистрация прошла успешно!")
            }
            user.setUser(data)
            user.setIsAuth(true)
            if(user.user.role_id === 2) navigate(MY_ORDERS_ROUTE)
            else navigate(ADMIN_ROUTE)
        } catch (e) {
            alert(e.response.data)
        }

    }


    return (
        <Container className="mt-4">
                <h5 className="fs-5" style={{color: "#ccc"}}>Главная / {isLogin ? 'Авторизация' : "Регистрация"}</h5>
            <Container style={{ borderRadius: "40px", color: "#ccc", border: "1px solid #ccc"}} className="d-flex flex-column align-items-center w-50">


                                    <Form className="d-flex flex-column w-75 p-5">
                                        <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                                        <Form.Control
                                            className="mt-4"
                                            placeholder="Введите ваш username..."
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}

                                        />
                                        <Form.Control
                                            className="mt-4"
                                            placeholder="Введите ваш пароль..."
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            type="password"
                                        />
                                        <Row className="d-flex justify-content-between mt-4 pl-3 pr-3 fs-10">
                                            {isLogin ?
                                                <div>
                                                    Нет аккаунта? <NavLink to={REGISTRATION_ROUTE} style={{color: "#FF6347"}}>Зарегистрируйся!</NavLink>
                                                </div>
                                                :
                                                <div>
                                                    Есть аккаунт? <NavLink to={LOGIN_ROUTE} style={{color: "#FF6347"}}>Войдите!</NavLink>
                                                </div>
                                            }
                                        </Row>

                                        <Button variant={"outline-danger"} className="mt-5" onClick={() => click(email,password)}>

                                            {isLogin ? 'Войти' : 'Регистрация'}
                                        </Button>

                                    </Form>



            </Container>


        </Container>
    );
});

export default AuthPage;