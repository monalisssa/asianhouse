import React, {useContext} from 'react';
import {Card} from "react-bootstrap";
import "../../../styles/main.css"
import {Context} from "../../../index";
const MenuCategoryCard = ({category}) => {

    const {menu} = useContext(Context)
    return (

        // eslint-disable-next-line no-undef
        <Card style={{width: "20%", padding: "0"}} className="category-list" onClick={() => menu.setSelectedCategory(category)} >
            <Card.Img variant="" src={"data:image/png;base64," + category.image} className="w-100"/>
            <Card.Title className="category-list-title">{category.name}</Card.Title>
        </Card>
    );
};

export default MenuCategoryCard;