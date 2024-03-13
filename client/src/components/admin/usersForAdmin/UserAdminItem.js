import React, {useContext} from 'react';
import {MdEdit} from "react-icons/md";
import {MDBBadge} from "mdb-react-ui-kit";
import default_avatar from "../../../static/default_avatar.png"
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
const UserAdminItem = observer(({item, setUserEdit, setEditStatusModalShow, index}) => {

    const {user} = useContext(Context)
    const editStatus = () =>
    {
        setUserEdit(item)
        setEditStatusModalShow(true)
    }


    return (
        <tr className={`fs-6 ${user.user.user_id === item.id ? "admin-row" : ""}`} style={{cursor: "pointer"  }}>
            <th scope='row'>{index+1}</th>
            <td>
                {
                    item.userInfo != null && item.userInfo.image!=null ?
                        <img
                            src={"data:image/png;base64," + item.userInfo.image}
                            alt=''
                            style={{ width: "3rem", height: "3rem" }}
                            className="rounded-circle"/>
                        :
                        <img
                            src={default_avatar}
                            alt=''
                            style={{ width: "3rem", height: "3rem" }}
                            className="rounded-circle"/>
                }

            </td>
            <td>{item.username}</td>
            <td>
                { item.userInfo != null && item.userInfo.firstname!=null
                    ?
                    item.userInfo.firstname
                    : "Не указано"
                }
            </td>
            <td>
                { item.userInfo != null && item.userInfo.lastname!=null
                    ?
                    item.userInfo.lastname
                    : "Не указано"
                }

            </td>
            <td>
                { item.userInfo != null && item.userInfo.tel!=null
                    ?
                    item.userInfo.tel
                    : "Не указано"
                }

            </td>
            <td>
                { item.userInfo != null && item.userInfo.email!=null
                ?
                    item.userInfo.email
                : "Не указано"
            }</td>
            <td>  { item.userInfo != null && item.userInfo.date_birth!=null
                ?
                item.userInfo.date_birth
                : "Не указано"
            }</td>
            <td>
                {
                    item.status === "Активный" &&   <MDBBadge color='primary' pill>
                        {item.status}
                    </MDBBadge>

                }

                {
                    item.status === "Заблокирован" &&   <MDBBadge color='danger' pill>
                        { item.status}
                    </MDBBadge>

                }

                {
                    item.status === "Администратор" &&   <MDBBadge color='warning' pill>
                        { item.status}
                    </MDBBadge>

                }
            </td>
            <td>
                {
                    item.status !== "Администратор" &&
                <MdEdit size={20} style={{cursor: "pointer"}}  className="delete-button" onClick={() => editStatus()}/>
                }
            </td>

        </tr>

    );
});

export default UserAdminItem;