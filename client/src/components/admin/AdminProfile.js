import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {editAvatar, editInfo, fetchUser} from "../../http/userApi";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import default_avatar from "../../static/default_avatar.png";
import {observer} from "mobx-react-lite";
import {MAIN_ROUTE} from "../../utils/consts";
import {useNavigate} from "react-router-dom";

const AdminProfile = observer(() => {

    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [editingInfo, setEditingInfo] = useState(true)
    const [username, setUsername] = useState()
    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const [tel, setTel] = useState()
    const [email, setEmail] = useState()
    const [avatar, setAvatar] = useState()
    const [validated, setValidated] = useState(false);

    const fileInputRef = React.useRef(null);

    const handleUploadButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileInputChange = (event) => {
        const selectedFile = event.target.files[0];
        const formData = new FormData();
        formData.append('avatar', selectedFile);
        editAvatar(formData, user.user.user_id).then(data => setAvatar(data.userInfo.image));
    };

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
            editUserInfo();
        }

    };

    const editUserInfo = () => {

        const formData = new FormData();
        const data = {};

        if (firstname !== "") {
            data.firstname = firstname;
        }

        if (lastname !== "") {
            data.lastname = lastname;
        }

        if (email !== "") {
            data.email = email;
        }

        if (tel !== "") {
            data.tel = tel;
        }

        const blob = new Blob([JSON.stringify(data)], {
            type: 'application/json'
        });

        formData.append('info', blob);

        if (Object.keys(data).length !== 0) editInfo(formData, user.user.user_id).then(data => setEditingInfo(true))




    }

    const exit = () => {
        user.setIsAuth(false)
        navigate(MAIN_ROUTE)
    };

    useEffect(() => {
        fetchUser(user.user.user_id).then(data => {

                setEmail(data.userInfo.email)
                setTel(data.userInfo.tel)
                setFirstname(data.userInfo.firstname)
                setLastname(data.userInfo.lastname)
                setAvatar(data.userInfo.image)
                setEditingInfo(false)

            setUsername(data.username)

        })
    }, [user, setEditingInfo])

    return (

        <Container className="d-flex flex-column align-items-center p-3 gap-4 fs-6">

                {
                    avatar != null  ?
                        <img
                            src={"data:image/png;base64," + avatar}
                            alt=''
                            style={{ width: "6rem", height: "6rem" }}
                            className="rounded-circle"/>
                        :
                        <img
                            src={default_avatar}
                            alt=''
                            style={{ width: "3rem", height: "3rem" }}
                            className="rounded-circle"/>
                }

                <div>
                    {/* Другой код компонента */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileInputChange}
                    />
                    <Button
                        className="basket-btn"
                        style={{ backgroundColor: "#FF6347" }}
                        onClick={handleUploadButtonClick}
                    >
                        Редактировать аватарку
                    </Button>
                </div>


                <Form noValidate validated={validated} onSubmit={handleSubmit} className="d-flex flex-column gap-2" >


                    <Form.Group as={Row} controlId="validationCustom01">

                        <Form.Label column sm="3">Username</Form.Label>
                        <Col sm="9">
                            <Form.Control
                                required
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                type="text"
                            />

                            <Form.Control.Feedback type="invalid">Пустое поле для username!</Form.Control.Feedback>
                        </Col>
                    </Form.Group>




                    <Form.Group as={Row} controlId="validationCustom03">

                        <Form.Label column sm="3">Имя</Form.Label>
                        <Col sm="9">
                            <Form.Control
                                value={firstname}
                                onChange={e => setFirstname(e.target.value)}
                                type="text"
                                pattern="^[а-яёА-ЯЁ]+$"
                            />
                            <Form.Control.Feedback type="invalid">Имя должно содержать русские буквы!</Form.Control.Feedback>
                        </Col>
                    </Form.Group>


                    <Form.Group as={Row} controlId="validationCustom04">

                        <Form.Label   column sm="3">Фамилия</Form.Label>
                        <Col sm="9">
                            <Form.Control
                                value={lastname}
                                onChange={e => setLastname(e.target.value)}
                                type="text"
                                pattern="^[а-яёА-ЯЁ]+$"
                            />
                            <Form.Control.Feedback type="invalid">Фамилия должно содержать русские буквы!</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="validationCustom05">

                        <Form.Label column sm="3">Телефон</Form.Label>
                        <Col sm="9">
                            <Form.Control
                                value={tel}
                                onChange={e => setTel(e.target.value)}
                                type="tel"
                                pattern="\+375 \(\d{2}\) \d{3}-\d{2}-\d{2}"
                            />

                            <Form.Control.Feedback type="invalid">Пример: +375 (33) 605-20-51</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="validationCustom06">

                        <Form.Label  column sm="3">Email</Form.Label>
                        <Col sm="9">
                            <Form.Control
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                            />
                            <Form.Control.Feedback type="invalid">Пример: eliza.romanova@gmail.com</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Button className="nav-button"  type="submit">Редактировать аккаунт</Button>
                    <Button className="nav-button"  onClick={() => exit()}>Выйти</Button>
                </Form>
        </Container>
    );
});

export default AdminProfile;