import React, {useContext} from 'react';
import { Form} from "react-bootstrap";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";


const SortBar = observer(() => {
    const {menu} = useContext(Context)
    return (
        <div>
            <Form className="d-flex ">
                <Form.Check // prettier-ignore
                    type={"checkbox"}
                    id={`default-checkbox`}
                    label="Сортировка по цене"
                    onClick={() => menu.setSortingOrder()}
                />
                {
                    menu.sortingOrder === "DESC" ? <FaArrowUp className="m-1 "/>
                        : <FaArrowDown className="m-1 "/>
                }

            </Form>


        </div>

    );
})

export default SortBar;