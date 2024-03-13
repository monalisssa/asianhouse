import React, {useContext} from 'react';
import {Container, Row} from "react-bootstrap";
import MenuCategoryCard from "./MenuCategoryCard";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";


const MenuCategoryList = observer(() => {
    const {menu} = useContext(Context)
    return (

        <Container className="d-flex flex-column align-items-center" >
            <div className=" w-50 mt-3" style={{borderBottom:" 1px solid #000", textAlign: "center"}}>
               <h3>Меню</h3>
            </div>
            <Row className="d-flex gap-4 justify-content-center mt-5">
                {menu.categories.map(category =>
                    <MenuCategoryCard key={category.id} category={category}/>
                )}
            </Row>
        </Container>

    );
})

export default MenuCategoryList;