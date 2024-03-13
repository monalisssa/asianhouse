import React from 'react';
import { Button, Modal} from "react-bootstrap";

const MyAlert = (state) => {
    return (
        <>
            <Modal show={state.show} onHide={() => state.setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Спасибо за заказ!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Заказ успешно оформлен! Можете его просмотреть в своём профиле.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => state.setShow(false)}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={() => state.setShow(false)}>
                        Ок
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default MyAlert;