import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Modal, Row} from "react-bootstrap";
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import "../../styles/modal.css"
import {Context} from "../../index";
import {login, registration} from "../../http/userApi";
import {observer} from "mobx-react-lite";
const AuthModalWindow = observer(({showAuthModal, setModalAuthShow}) => {
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
            setModalAuthShow(false)
            navigate(MAIN_ROUTE)
        } catch (e) {
            alert(e.response.data)
        }

    }

    const closeModal = () => {
        setModalAuthShow(false);
        navigate(MAIN_ROUTE)
    }

    return (

        <Modal
               size="xs"
               show={showAuthModal}
               onHide={() => closeModal()}
               aria-labelledby="example-modal-sizes-title-lg"
        >

            <Modal.Body className="pb-0">

                <Container
                    className="d-flex justify-content-center align-items-center">
                    <Card style={{width: 600}} className="p-5">
                        <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                        <Form className="d-flex flex-column">
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите ваш username..."
                                value={email}
                                onChange={e => setEmail(e.target.value)}

                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите ваш пароль..."
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                            />
                            <Row className="d-flex justify-content-between mt-3 pl-3 pr-3 fs-10">
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

                            <Button variant={"outline-danger"} className="mt-4" onClick={() => click(email,password)}>

                                {isLogin ? 'Войти' : 'Регистрация'}
                            </Button>

                        </Form>
                    </Card>
                </Container>

            </Modal.Body>

        </Modal>


    );
})
export default AuthModalWindow;