import React from 'react';
import {Button, Col,  Modal, Row} from "react-bootstrap";
import {FaPepperHot} from "react-icons/fa";

const ExtraInfoMenuItem = ({item, show, onHide}) => {
    return (
        <Modal
            size={"lg"}
            show={show}
            onHide={onHide}

        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Дополнительная информация
                </Modal.Title>

            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className="d-flex flex-column align-items-center">
                        <img src={"data:image/png;base64," + item.image} style={{borderRadius: "10%"}} width={300} alt="menu-item"/>
                        <h4 className="fw-bold mt-3">{item.name}</h4>
                    </Col>
                    <Col className="d-flex flex-column  gap-3">

                        <div className="price">
                            {item.price} <sup>руб.</sup>
                        </div>

                        <div className="d-flex gap-2 text-center">
                            Вес: <span style={{color: "#848482"}}>{item.weight} грамм</span>, Каллории: <span style={{color: "#848482"}}>{item.menuItemInfo.calories} ккал</span>
                        </div>

                        <div className="d-flex align-items-center gap-3 text-center">
                            Ингридиенты: <span style={{color: "#848482"}}>{item.menuItemInfo.ingredients}</span>
                        </div>
                        {
                            <div className="d-flex justify-content-end">
                                {item.menuItemInfo.is_spicy && <FaPepperHot size={30}/>}
                            </div>

                        }
                    </Col>
                </Row>


            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={() => onHide()}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ExtraInfoMenuItem;