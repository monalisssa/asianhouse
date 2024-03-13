import React from 'react';
import {ListGroup} from "react-bootstrap";
import "../../styles/main.css"
const AdminBar = ({admin_menu, admin_icons, setSelectedMenu, selectedMenu}) => {
    return (
        <ListGroup className="mt-2">
            {admin_menu.map((item, index) =>
                // eslint-disable-next-line react/jsx-no-undef
                <ListGroup.Item
                    style={{cursor:'pointer'}}
                    key={index}
                    active={item === selectedMenu}
                    onClick={() => setSelectedMenu(item)}
                    className="p-2"
                >
                    <div className="d-flex align-items-center gap-4">
                        {admin_icons[index]}
                        {item}
                    </div>

                </ListGroup.Item>
            )}
        </ListGroup>
    );
};

export default AdminBar;