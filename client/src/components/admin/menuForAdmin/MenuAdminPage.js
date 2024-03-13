import React, {useContext, useEffect, useState} from 'react';
import {Button, Col,  Row, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import AdminBar from "../AdminBar";
import {MDBCol, MDBIcon} from "mdb-react-ui-kit";
import ModalAddCategory from "./modals/ModalAddCategory";
import ModalAddMenuItem from "./modals/ModalAddMenuItem";
import MenuCategoryTable from "./menuCategoryTable";
import MenuTable from "./MenuTable";
import {Context} from "../../../index";
import {fetchCategories, fetchMenuItems} from "../../../http/menuApi";

import {observer} from "mobx-react-lite";
import FilterMenu from "./FilterMenu";

const MenuAdminPage = observer((state) => {

    const {menu} = useContext(Context)

    const [selectedTableMenu, setTableSelectedMenu] = useState("Категории");
    const [addCategoryModalShow, setAddCategoryModalShow] = useState(false);
    const [addMenuItemModalShow, setAddMenuItemModalShow] = useState(false);
    const [searchValue, setSearchValue] = useState("");


    useEffect(() => {
        fetchMenuItems(null).then(data => menu.setAllItems(data))
        fetchCategories().then(data => {menu.setCategories(data)})
    },[menu])


    useEffect(() => {
        if(searchValue === "" && selectedTableMenu === "Блюда") fetchMenuItems(null).then(data => {menu.setAllItems(data)})
        if(searchValue === "" && selectedTableMenu === "Категории") fetchCategories().then(data => {menu.setCategories(data)})
    },[menu, searchValue, selectedTableMenu, setSearchValue])

    const searchMenuItem = () =>
    {
        if(selectedTableMenu === "Блюда") menu.setAllItems(menu.all_items.filter(item => item.name === searchValue))
        else menu.setCategories(menu.categories.filter(item => item.name === searchValue))
    }

    return (
        <Row className="p-3 gap-4">
            <Col md={3} className="d-flex flex-column gap-4">
                <AdminBar admin_menu = {state.admin_menu} admin_icons = {state.admin_icons}  setSelectedMenu = {state.setSelectedMenu} selectedMenu={state.selectedMenu}/>
                <div>
                    <ToggleButtonGroup className="w-100"
                                       type="radio"
                                       name="menuOptions"
                                       defaultValue={"Категории"}
                                       onChange={setTableSelectedMenu}>
                        <ToggleButton id="tbg-radio-1" value={"Категории"}>
                            Категории
                        </ToggleButton>
                        <ToggleButton id="tbg-radio-2" value={"Блюда"}>
                            Блюда
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>

                <MDBCol className="d-flex flex-column">
                    <form className="form-inline mt-2 mb-2 d-flex gap-2 justify-content-center" onSubmit={(e) => e.preventDefault()}>
                        <MDBIcon icon="search" onClick = {() => searchMenuItem()}/>
                        <input
                            className="form-control form-control-sm ml-3 w-75"
                            type="text"
                            placeholder="Введите название блюда"
                            aria-label="Search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    searchMenuItem();
                                }
                            }}
                        />

                    </form>
                    {
                        selectedTableMenu === "Блюда" &&
                    <FilterMenu />
                    }
                    {
                        selectedTableMenu === "Категории" ?  <Button className="nav-button mt-3" onClick={() => setAddCategoryModalShow(true)}>Добавить категорию</Button>
                            :     <Button className="nav-button mt-3" onClick={() => setAddMenuItemModalShow(true)}>Добавить блюдо</Button>
                    }


                    {addCategoryModalShow && <ModalAddCategory show={addCategoryModalShow} onHide={setAddCategoryModalShow} category={null}/>
                    }

                    {addMenuItemModalShow && <ModalAddMenuItem show={addMenuItemModalShow} onHide={setAddMenuItemModalShow} item={null}/>
                    }
                </MDBCol>





            </Col>
            <Col md={8} className="d-flex flex-column gap-5">
                {
                    selectedTableMenu === "Категории" ?  <MenuCategoryTable />
                        :  <MenuTable />
                }

            </Col>

        </Row>
    );
});

export default MenuAdminPage;