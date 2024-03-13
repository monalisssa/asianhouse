import React, {useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {editStatusUser} from "../../../../http/userApi";

const UserEditStatusModel = ({show, onHide,  user}) => {
    const [status, setStatus] = useState("")

    const arrayStatus = ["Заблокирован", "Активный"]

    const editStatus = () =>
    {
        editStatusUser(user.id, status).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить статус пользователя
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>

                            {
                                status || "Выберите статус пользователя"}</Dropdown.Toggle>
                        <Dropdown.Menu>

                            {arrayStatus.map(st =>

                                <Dropdown.Item
                                    onClick={() => setStatus(st)}
                                    key={st.length}
                                >
                                    {st}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={() => onHide()}>Закрыть</Button>
                <Button variant="outline-success" onClick={() => editStatus()}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserEditStatusModel;