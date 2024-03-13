import React from 'react';
import {MdDelete, MdEdit} from "react-icons/md";
import {FaPepperHot} from "react-icons/fa";

const MenuItemCard = ({item, deleteItemFromMenu, editItem, index}) => {
    return (
        <tr className="fs-6 " style={{cursor: "pointer"}}>
            <th scope='row'>{index + 1}</th>
            <td>
                <img
                    src={"data:image/png;base64," + item.image}
                    alt=''
                    style={{ width: "5rem" }}
                    className="rounded-4"
                /></td>
            <td>{item.name}</td>
            <td>{item.menuCategory.name}</td>
            <td>{item.price} руб.</td>
            <td>{item.weight} г.</td>
            <td>{item.menuItemInfo.ingredients}</td>
            <td>{item.menuItemInfo.calories}</td>
            <td>
                {
                    item.menuItemInfo.is_spicy ? <FaPepperHot />
                        : ""

                }
            </td>
            <td>
                <MdDelete size={20} onClick={() => deleteItemFromMenu(item)} style={{cursor: "pointer"}} className="delete-button"/>
            </td>
            <td>
                <MdEdit size={20} style={{cursor: "pointer"}} onClick={() => editItem(item)} className="delete-button"/>
            </td>
        </tr>
    );
};

export default MenuItemCard;