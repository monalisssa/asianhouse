import React, {useContext, useState} from 'react';
import {Context} from "../../../index";
import {Container, Row} from "react-bootstrap";
import MenuItemCard from "./MenuItemCard";
import {observer} from "mobx-react-lite";
import SortBar from "./SortBar";
import ExtraInfoMenuItem from "../Modals/ExtraInfoMenuItem";

const MenuList = observer(({addToBasket}) => {


    const {menu} = useContext(Context)

    const [modalShow, setModalShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState();

    const handleSelectedItem = (item) =>
    {
        setModalShow(true)
        setSelectedItem(item)
    }
    return(

        <Container className={"d-flex flex-column align-items-center"}>

            <div className="w-100 d-flex justify-content-end ">
                <div className="w-50" style={{borderBottom:" 1px solid #000", textAlign: "center"}} >
                    <h3>Меню</h3>
                </div>
                <SortBar />
            </div>


            <Row className="d-flex gap-4 justify-content-center mt-5">
                {
                    menu.sortedItems.map(item =>
                    <MenuItemCard key={item.id} item={item} addToBasket={addToBasket} click = {handleSelectedItem}/>
                )}
            </Row>

            {
                modalShow && <ExtraInfoMenuItem show={modalShow} onHide={setModalShow} item = {selectedItem}/>
            }
        </Container>
    );
}
)

export default MenuList;