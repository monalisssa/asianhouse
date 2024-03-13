import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../index";
import {Button, Col, Dropdown, Form, Row} from "react-bootstrap";
import AdminBar from "../AdminBar";
import {MDBCol, MDBIcon} from "mdb-react-ui-kit";
import {observer} from "mobx-react-lite";
import UserAdminTable from "./UserAdminTable";
import {fetchAllUsers} from "../../../http/userApi";
import ModalAddAdmin from "./modals/ModalAddAdmin";

const UserAdminPage = observer((state) => {


    const {user} = useContext(Context)
    const [searchValue, setSearchValue] = useState("");
    const [filter, setFilter] = useState(false)
    const [status, setStatus] = useState("")
    const arrayStatus = ["Активный", "Заблокирован", "Администратор"]
    const [addAdminModalShow, setAdminModalShow] = useState(false);

    useEffect(() => {
        fetchAllUsers().then(data =>  user.setAllUsers(data))
    },[user])


    useEffect(() => {
        if(searchValue === "") fetchAllUsers().then(data => user.setAllUsers(data))
    },[searchValue, setSearchValue])

    const searchUser = () => {
        user.setAllUsers(user.all_users.filter(item => item.username === searchValue))
    }

    useEffect(() => {
        if (filter) {
            fetchAllUsers().then(data =>  user.setAllUsers(data.filter(item => {
                    return (
                        (item.status === status || status === ''));
                })
            ));
        } else {
            fetchAllUsers().then(data =>  user.setAllUsers(data));
        }
    }, [filter, setFilter, status]);

    return (

        <Row className="p-3 gap-2">
            <Col md={3} >
                <AdminBar admin_menu = {state.admin_menu} admin_icons = {state.admin_icons}  setSelectedMenu = {state.setSelectedMenu} selectedMenu={state.selectedMenu}/>
                <MDBCol className="d-flex flex-column">
                    <form className="form-inline d-flex gap-2 justify-content-center mt-4" onSubmit={(e) => e.preventDefault()}>
                        <MDBIcon icon="search" onClick = {() => searchUser()}/>
                        <input
                            className="form-control form-control-sm ml-3 w-75"
                            type="text"
                            placeholder="Введите username"
                            aria-label="Search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    searchUser();
                                }
                            }}
                        />
                    </form>


                    <h5 className="mt-4 mb-0 d-flex gap-2 align-items-center">
                        Фильтрация
                        <Form.Check // prettier-ignore
                            type={"checkbox"}
                            id={`default-checkbox`}
                            value={filter}
                            onChange={(e) => setFilter(e.target.checked)}
                        />
                    </h5>

                    <Form className="d-flex flex-column gap-2 align-items-center">
                            <Dropdown className="w-100 mt-3 mb-3">
                                <Dropdown.Toggle>

                                    {
                                        status || "Выберите статус"}</Dropdown.Toggle>
                                <Dropdown.Menu>

                                    {arrayStatus.map(st =>

                                        <Dropdown.Item
                                            onClick={() => setStatus(st)}
                                            key={st.length}
                                        >
                                            {st}
                                        </Dropdown.Item>
                                    )}

                                    {status && (
                                        <Dropdown.Item onClick={() => setStatus('')}>
                                            Отменить значение
                                        </Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>

                    </Form>
                    <Button onClick={() => setAdminModalShow(true)}>Добавить администратора</Button>
                </MDBCol>





                {addAdminModalShow && <ModalAddAdmin show={addAdminModalShow} onHide={setAdminModalShow} editUser={null}/>
                }
            </Col>

            <Col md={2}>
                <UserAdminTable />
            </Col>

        </Row>
    );
});

export default UserAdminPage;