import React, {useContext, useEffect} from 'react';
import {Col, Container,  Row} from "react-bootstrap";
import {Context} from "../index";
import {fetchCategories, fetchMenuItems} from "../http/menuApi";
import MenuBar from "../components/menu/menuItems/MenuBar";
import MenuList from "../components/menu/menuItems/MenuList";
import MenuCategoryList from "../components/menu/category/MenuCategoryList";
import {observer} from "mobx-react-lite";
import {addItem, fetchBasketItems} from "../http/basketApi";

const Menu = observer(() => {

    const {menu, user, basket} = useContext(Context)

    useEffect(() => {
        fetchMenuItems(menu.selectedCategory.id).then(data => {
            menu.setItems(data)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        })
    }, [menu, menu.selectedCategory])

     useEffect(() => {
         if(!menu.isSelected) {
             fetchCategories().then(data =>
                 menu.setCategories(data)
             )
         }

     },[menu])
    const addToBasket = (item) =>
    {
        if(user.isAuth) {
            addItem(user.user.user_id, item.id)
                .then(data => fetchBasketItems(user.user.user_id)
                .then(data => basket.setBasketItems(data)))
        }
        else{
            alert("Необходимо авторизоваться!")
        }

    }

    return (
        <Container className="mt-4">
            {menu.isSelected &&
            <h5 className="fs-5" style={{color: "#ccc"}}>Меню / {menu.selectedCategory.name}</h5>}
        <Container style={{backgroundColor: "rgb(255,255,255,0.9)", minHeight: "80vh", borderRadius: "40px"}} className="d-flex flex-column">
            {menu.isSelected?
            <Row className="p-3 gap-4">
                <Col md={3}>
                    <MenuBar/>
                </Col>
                <Col md={8}>
                    <MenuList addToBasket = {addToBasket}/>
                </Col>
            </Row>
            : <MenuCategoryList/>
            }
        </Container>


        </Container>

    );
}
)

export default Menu;