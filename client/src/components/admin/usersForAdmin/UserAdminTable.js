import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../index";
import {MDBTable, MDBTableBody, MDBTableHead} from "mdb-react-ui-kit";
import {observer} from "mobx-react-lite";
import {fetchAllUsers} from "../../../http/userApi";
import UserAdminItem from "./UserAdminItem";
import UserEditStatusModel from "./modals/UserEditStatusModel";

const UserAdminTable = observer(() => {


    const {user} = useContext(Context)

    const [editStatusModalShow, setEditStatusModalShow] = useState(false);
    
    const [userEdit, setUserEdit] = useState({});

    useEffect(() => {
        fetchAllUsers().then(data =>  user.setAllUsers(data))
    },[editStatusModalShow, setEditStatusModalShow, user])

    return (

        <>
            <MDBTable hover align="middle" style={{width: "57rem", borderRadius: "10px"}} >
                <MDBTableHead>
                    <tr className="fs-6">
                        <th scope='col'>#</th>
                        <th scope='col'>Аватар</th>
                        <th scope='col'>Username</th>
                        <th scope='col'>Имя</th>
                        <th scope='col'>Фамилия</th>
                        <th scope='col'>Телефон</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Дата рождения</th>
                        <th scope='col'>Статус</th>
                        <th scope='col'></th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {
                        user.all_users.map((item, index) =>
                            <UserAdminItem item={item} setUserEdit = {setUserEdit} setEditStatusModalShow={setEditStatusModalShow} index={index}/>
                        )
                    }

                </MDBTableBody>

            </MDBTable>

            {
                editStatusModalShow && <UserEditStatusModel show={editStatusModalShow} onHide={setEditStatusModalShow} user = {userEdit}/>
            }

        </>


    );
});

export default UserAdminTable;