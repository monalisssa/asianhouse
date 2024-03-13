import React, {useContext, useState} from 'react';
import {MDBTable, MDBTableBody, MDBTableHead} from "mdb-react-ui-kit";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import MenuItemCard from "./MenuItemCard";
import {deleteItemFromMenu, fetchMenuItems} from "../../../http/menuApi";
import ModalAddMenuItem from "./modals/ModalAddMenuItem";

const MenuTable = observer(() => {

    const {menu} = useContext(Context)
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [editingItem, setEditingItem] = useState({})
    const editItem = (item) =>
    {
        setShowModalEdit(true)
        setEditingItem(item)
    }
    const deleteItem = (item) =>
    {
        deleteItemFromMenu(item.id).then(data => fetchMenuItems(null).then(data => menu.setAllItems(data)))
    }

    return (
        <>
        <MDBTable hover align="middle"  style={{width: "56rem", borderRadius: "10px"}}>
            <MDBTableHead>
                <tr className="fs-6">
                    <th scope='col'>#</th>
                    <th scope='col'>Картинка</th>
                    <th scope='col'>Название</th>
                    <th scope='col'>Категория</th>
                    <th scope='col'>Цена</th>
                    <th scope='col'>Вес</th>
                    <th scope='col'>Ингридиенты</th>
                    <th scope='col'>Калории</th>
                    <th scope='col'>Острое</th>
                    <th scope='col'></th>
                    <th scope='col'></th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {
                    menu.all_items.map((item,index) =>
                        <MenuItemCard item={item} deleteItemFromMenu={deleteItem} editItem={editItem} index={index}/>
                    )
                }

            </MDBTableBody>

        </MDBTable>

            {
                showModalEdit && <ModalAddMenuItem show={showModalEdit} onHide={setShowModalEdit} item={editingItem}/>
            }
        </>
    );
});

export default MenuTable;