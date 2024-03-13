import React from 'react';
import {MdDelete, MdEdit} from "react-icons/md";

const MenuCategoryCard = ({item, deleteCategory, editCategory, index}) => {
    return (
        <tr className="fs-5">
            <th scope='row'>{index+1}</th>
            <td>
                <img
                    src={"data:image/png;base64," + item.image}
                    alt=''
                    style={{ width: "5rem" }}
                    className="rounded-4"
                /></td>
            <td>{item.name}</td>
            <td>
                <MdDelete size={25} style={{cursor: "pointer"}} className="delete-button" onClick={() => deleteCategory(item)}/>
            </td>

            <td>
                <MdEdit size={25} style={{cursor: "pointer"}} className="delete-button" onClick={() => editCategory(item)}/>
            </td>
        </tr>
    );
};

export default MenuCategoryCard;