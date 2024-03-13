import React, {useState} from 'react';


import {Button, Form, Modal, } from "react-bootstrap";
import {observer} from "mobx-react-lite";

import {addUserInfo, registration} from "../../../../http/userApi";

const ModalAddAdmin = observer(({show, onHide, editUser}) => {


    const [username, setUsername] = useState(editUser !== null ? editUser.username : '')
    const [password, setPassword] = useState(editUser !== null ? editUser.password : '')
    const [firstname, setFirstname] = useState(editUser !== null ? editUser.userInfo.firstname : '')
    const [lastname, setLastname] = useState(editUser !== null ? editUser.userInfo.lastname : '')
    const [tel, setTel] = useState(editUser !== null ? editUser.userInfo.tel : '')
    const [email, setEmail] = useState(editUser !== null ? editUser.userInfo.email : '')
    const [file, setFile] = useState(null)
    const [validated, setValidated] = useState(false);

    const selectFile = e => {
        setFile(e.target.files[0])
    }


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
            addAdmin();
        }

    };

    const addAdmin = () => {

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

        formData.append('avatar', file);
        formData.append('info', blob);


            registration(username, password, 1).then(res => {

                if ( (Object.keys(data).length !== 0 && file!==null) || file!==null || Object.keys(data).length !== 0) addUserInfo(formData,  res.user_id).then(data => onHide())
                else onHide()
            }).catch( e => alert(e.response.data))




    }
    return (
        // eslint-disable-next-line react/jsx-no-undef
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {

                        editUser!=null ? "Редактировать администратора"
                            : "Добавить администратора"
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>


                    <Form.Group controlId="validationCustom01">
                        <Form.Control
                            required
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="mt-3"
                            placeholder="Username"
                            type="text"
                        />
                        <Form.Control.Feedback type="invalid">Пустое поле для username!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="validationCustom02">
                        <Form.Control
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="mt-3"
                            placeholder="Пароль"
                            type="password"
                        />
                        <Form.Control.Feedback type="invalid">Пустое поле для пароля!</Form.Control.Feedback>
                    </Form.Group>


                    <h5  className="mt-3">Дополнительно</h5>

                    <Form.Group controlId="validationCustom03">
                        <Form.Control
                            value={firstname}
                            onChange={e => setFirstname(e.target.value)}
                            className="mt-3"
                            placeholder="Имя"
                            type="text"
                            pattern="^[а-яёА-ЯЁ]+$"
                        />
                        <Form.Control.Feedback type="invalid">Имя должно содержать русские буквы!</Form.Control.Feedback>
                    </Form.Group>


                    <Form.Group controlId="validationCustom04">
                        <Form.Control
                        value={lastname}
                        onChange={e => setLastname(e.target.value)}
                        className="mt-3"
                        placeholder="Фамилия"
                        type="text"
                        pattern="^[а-яёА-ЯЁ]+$"
                        />
                    <Form.Control.Feedback type="invalid">Фамилия должно содержать русские буквы!</Form.Control.Feedback>
                   </Form.Group>

                <Form.Group controlId="validationCustom05">
                    <Form.Control
                        value={tel}
                        onChange={e => setTel(e.target.value)}
                        className="mt-3"
                        placeholder="Телефон (Пример: +375 (33) 605-20-51)"
                        type="tel"
                        pattern="\+375 \(\d{2}\) \d{3}-\d{2}-\d{2}"
                    />
                    <Form.Control.Feedback type="invalid">Некорректный ввод телефона!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="validationCustom06">
                    <Form.Control
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="mt-3"
                        placeholder="Email (Пример: eliza.romanova@gmail.com)"
                        type="email"
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    />
                    <Form.Control.Feedback type="invalid">Некорректный ввод email!</Form.Control.Feedback>
                </Form.Group>

                    <h6  className="mt-3">Аватар</h6>
                    {

                        editUser!=null ?  <img
                            src={"data:image/png;base64," + editUser.image}
                            alt=''
                            style={{ width: "8rem" }}
                            className="rounded-4 mt-3 ms-5"
                        />
                            :
                            <Form.Control
                                type="file"
                                onChange={selectFile}
                            />
                    }


            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={() => onHide()}>Закрыть</Button>

                { editUser!=null ?  <Button variant="outline-success" >
                        Редактировать
                    </Button>
                    :
                    <Button variant="outline-success" type="submit">
                        Добавить
                    </Button>
                }
            </Modal.Footer>

            </Form>
        </Modal>
    );
});

export default ModalAddAdmin;