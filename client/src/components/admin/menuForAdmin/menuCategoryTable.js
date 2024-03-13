import React, {useContext, useState} from 'react';
import {Context} from "../../../index";
import {MDBTable, MDBTableBody, MDBTableHead} from "mdb-react-ui-kit";
import {observer} from "mobx-react-lite";
import MenuCategoryCard from "./MenuCategoryCard";
import {deleteCategory,  fetchCategories} from "../../../http/menuApi";
import ModalAddCategory from "./modals/ModalAddCategory";

const MenuCategoryTable = observer(() => {
    const {menu} = useContext(Context)

    const [editingItem, setEditingItem] = useState({})
    const [showModalEdit, setShowModalEdit] = useState(false)
    const editCategory = (item) =>
    {
        setShowModalEdit(true)
        setEditingItem(item)
    }
    const deleteMenuCategory = (item) =>
    {
        deleteCategory(item.id).then(data => fetchCategories().then(data => menu.setCategories(data)))
    }

    return (
        <MDBTable hover style={{width: "30rem"}} className="ms-5"  align="middle">
            <MDBTableHead>

                <tr className="fs-6">
                    <th scope='col'>#</th>
                    <th scope='col'>Картинка</th>
                    <th scope='col'>Название</th>
                    <th scope='col'></th>
                    <th scope='col'></th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {
                    menu.categories.map((item,index) =>
                        <MenuCategoryCard item={item} deleteCategory={deleteMenuCategory} editCategory={editCategory} index={index}/>
                    )
                }
            </MDBTableBody>

            {
                showModalEdit && <ModalAddCategory show={showModalEdit} onHide={setShowModalEdit} category={editingItem}/>
            }
        </MDBTable>
    );
});

export default MenuCategoryTable;