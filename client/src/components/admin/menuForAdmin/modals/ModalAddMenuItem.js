import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import {createMenuItem, editMenu, fetchCategories, fetchMenuItems} from "../../../../http/menuApi";



const ModalAddMenuItem = observer(({show, onHide, item}) => {

    const {menu} = useContext(Context)
    const [name, setName] = useState(item !== null ? item.name : '')
    const [weight, setWeight] = useState(item !== null ? item.weight : '')
    const [price, setPrice] = useState(item !== null ? item.price : '')
    const [calories, setCalories] = useState(item !== null ? item.menuItemInfo.calories : '')
    const [ingredients, setIngredients] = useState(item !== null ? item.menuItemInfo.ingredients : '')
    const [spicy, setSpicy] = useState(item !== null ? item.menuItemInfo.is_spicy : false)
    const [file, setFile] = useState(null)
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if(item!=null) {
            menu.setSelectedCategory(item.menuCategory)
        }

    },[])


    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addMenuItem = () => {

        const info = {calories: calories, ingredients: ingredients, is_spicy: spicy}
        const data = {name: name, price: price, weight: weight, menuItemInfo: info}

        const formData = new FormData();

        const blob = new Blob([JSON.stringify(data)], {
            type: 'application/json'
        });

        formData.append('image', file);
        formData.append('data', blob);

        createMenuItem(formData, menu.selectedCategory.id).then(data => {
                 fetchMenuItems(null).then(data => menu.setAllItems(data)); onHide();
            }
        )
    }

    const editMenuItem = () => {

        const info = {calories: Number(calories), ingredients: ingredients, is_spicy: spicy}
        const data = {name: name, price: parseFloat(price), weight: Number(weight), menuItemInfo: info}

        const formData = new FormData();

        const blob = new Blob([JSON.stringify(data)], {
            type: 'application/json'
        });

        formData.append('data', blob);

        editMenu(formData, item.id, menu.selectedCategory.id).then(data =>
        {fetchMenuItems(null).then(data => menu.setAllItems(data)); onHide()})



    }



    useEffect(() => {
        fetchCategories().then(data => menu.setCategories(data))
    }, [])


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
            if(!menu.isSelected) alert("Категория не выбрана!")
            else{
                if(item!=null) editMenuItem();
                else addMenuItem()
            }

        }

    };

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

                        item!=null ? "Редактировать блюдо"
                                   : "Добавить блюдо"
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                        <Dropdown className="mt-2 mb-2" aria-required>
                            <Dropdown.Toggle>
                                {
                                    menu.selectedCategory.name || "Выберите категорию"}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {menu.categories.map(category =>
                                    <Dropdown.Item
                                        onClick={() => menu.setSelectedCategory(category)}
                                        key={category.id}
                                    >
                                        {category.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>




                    <Form.Group controlId="validationCustom02">
                        <Form.Control
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="mt-3"
                            placeholder="Введите название блюда"
                            pattern="^[а-яёА-ЯЁ\s]+$"
                        />
                        <Form.Control.Feedback type="invalid">Название блюда должно содержать русские буквы!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="validationCustom03">
                        <Form.Control
                            required
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            className="mt-3"
                            placeholder="Введите стоимость "
                            pattern="[0-9]+([.][0-9]+)?"
                        />
                        <Form.Control.Feedback type="invalid">Стоимость должна включать цифры!</Form.Control.Feedback>
                    </Form.Group>


                    <Form.Group controlId="validationCustom04">
                        <Form.Control
                            required
                            value={weight}
                            onChange={e => setWeight(e.target.value)}
                            className="mt-3"
                            placeholder="Введите вес "
                            pattern="[0-9]*"
                        />
                        <Form.Control.Feedback type="invalid">Вес может быть только целым числом!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="validationCustom05">
                        <Form.Control
                            required
                            value={calories}
                            onChange={e => setCalories(e.target.value)}
                            className="mt-3"
                            placeholder="Введите количество каллорий"
                            pattern="[0-9]*"
                        />
                        <Form.Control.Feedback type="invalid">Количество каллорий может быть только целым числом!</Form.Control.Feedback>
                    </Form.Group>


                    <Form.Group controlId="validationCustom06">
                        <Form.Control
                            required
                            value={ingredients}
                            onChange={e => setIngredients(e.target.value)}
                            className="mt-3"
                            as="textarea"
                            placeholder="Перечислите ингридиенты"
                            rows={3}
                        />
                        <Form.Control.Feedback type="invalid">Поле не может оставаться пустым!</Form.Control.Feedback>
                    </Form.Group>


                    <ToggleButtonGroup
                        className="mt-3"
                        type="radio"
                        name="spicyOptions"
                        onChange={setSpicy}
                        defaultValue={false}>
                        <ToggleButton id="tbg-radio-222" value={false}>
                            Не острое
                        </ToggleButton>
                        <ToggleButton id="tbg-radio-111" value={true}>
                            Острое
                        </ToggleButton>

                    </ToggleButtonGroup>

                    {

                        item!=null &&  <img
                            src={"data:image/png;base64," + item.image}
                            alt=''
                            style={{ width: "8rem" }}
                            className="rounded-4 mt-3 ms-5"
                        />
                    }

                    {item==null &&
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

                { item!=null ?  <Button variant="outline-success" type="submit">
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

export default ModalAddMenuItem;