import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../index";
import {Dropdown, Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {fetchCategories, fetchMenuItems} from "../../../http/menuApi";


const FilterMenu = observer(() => {

    const [category, setCategory] = useState("")
    const [arrayCategories, setArrayCategories] = useState([])
    const [filter, setFilter] = useState(false)
    const [spicy, setSpicy] = useState()
    const {menu} = useContext(Context)


    useEffect(() => {
        if (filter) {
            fetchMenuItems(null).then(data =>  menu.setAllItems(data.filter(item => {
                    return (
                        (item.menuItemInfo.is_spicy === spicy) && (item.menuCategory.name === category || category === '')
                    );
                })
            ));
        } else {
            fetchMenuItems(null).then(data =>  menu.setAllItems(data));
        }
    }, [filter, setFilter, category, spicy]);

    useEffect(() => {
     fetchCategories().then(data => setArrayCategories(data))
    }, []);

    return (

          <>
            <h5 className="mt-4 mb-0 d-flex gap-2 align-items-center">
                Фильтрация
                <Form.Check // prettier-ignore
                    type={"checkbox"}
                    id={`default-checkbox`}
                    value={filter}
                    onChange={(e) => setFilter(e.target.checked)}
                />
            </h5>

            <Form className="d-flex flex-column gap-2 align-items-center-center">
                <div className="d-flex gap-2 align-items-center-center">

                    <Dropdown className="w-100 mt-3 mb-3">
                        <Dropdown.Toggle>
                            {
                                category || "Выберите категорию"}</Dropdown.Toggle>
                        <Dropdown.Menu>

                            {arrayCategories.map(category =>

                                <Dropdown.Item className="w-100"
                                    onClick={() => setCategory(category.name)}
                                    key={category.length}
                                >
                                    {category.name}
                                </Dropdown.Item>
                            )}

                            {category && (
                                <Dropdown.Item className="w-100" onClick={() => setCategory('')}>
                                    Отменить значение
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>


                <Dropdown className=" mt-3 mb-3">
                    <Dropdown.Toggle>
                        {
                            spicy ? "Острые"
                                : "Не острые"
                        }
                        </Dropdown.Toggle>
                    <Dropdown.Menu>

                        <Dropdown.Item
                                onClick={() => setSpicy(true)}>
                                Острые
                        </Dropdown.Item>

                            <Dropdown.Item
                            onClick={() => setSpicy(false)}>
                        Не острые
                    </Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>
                </div>
            </Form>

          </>
    );
});

export default FilterMenu;