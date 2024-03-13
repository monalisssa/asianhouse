import React, {useContext} from 'react';
import {Context} from "../../../index";
import { ListGroup} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const MenuBar =  observer(() => {
    const {menu} = useContext(Context)

    return (
        <ListGroup className="mt-5">
            {menu.categories.map(category =>
                <ListGroup.Item
                    style={{cursor:'pointer'}}
                    active={category.id === menu.selectedCategory.id}
                    onClick={() => menu.setSelectedCategory(category)}
                    key={category.id}
                    className="p-2"
                >
                    {category.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
})

export default MenuBar;