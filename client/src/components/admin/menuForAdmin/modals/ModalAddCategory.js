import React, {useContext, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {
    createCategory,
    editCategory,
    fetchCategories,
} from "../../../../http/menuApi";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";

const ModalAddCategory = observer(({show, onHide, category}) => {
    const [value, setValue] = useState(category !== null ? category.name : '')
    const [file, setFile] = useState(null)
    const [validated, setValidated] = useState(false);
    const {menu} = useContext(Context)
    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addCategory = () => {

        const formData = new FormData();

        formData.append('image', file);
        formData.append('name', value);

        createCategory(formData).then(data => {
                fetchCategories(null).then(data => menu.setCategories(data)); onHide();
            }
        )
    }

    const editMenuCategory = () => {

        editCategory(category.id, value).then(data => {
                fetchCategories(null).then(data => menu.setCategories(data)); onHide();
            }
        )
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

                if(category!=null) editMenuCategory();
                else addCategory()


        }

    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {

                        category!=null ? "Редактировать категорию"
                            : "Добавить категорию"
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form.Group controlId="validationCustom02">
                    <Form.Control
                        required
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название категории"}
                        pattern="^[а-яёА-ЯЁ\s]+$"
                    />
                    <Form.Control.Feedback type="invalid">Название категории должно содержать русские буквы!</Form.Control.Feedback>
                </Form.Group>



                    {
                        category == null &&
                        <Form.Group controlId="validationCustom07">
                            <Form.Control
                                required
                                className="mt-3"
                                type="file"
                                onChange={selectFile}
                            />
                            <Form.Control.Feedback type="invalid">Необходимо выбрать файл!</Form.Control.Feedback>
                        </Form.Group>

                    }


            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={() => onHide()}>Закрыть</Button>
                { category!=null ?  <Button variant="outline-success" type="submit">
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

export default ModalAddCategory;