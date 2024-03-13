import React from 'react';
import {ListGroup} from "react-bootstrap";

const ProfileBar = ({user_menu, user_icons, setSelectedMenu, selectedMenu}) => {
    return (

            <ListGroup className="mt-5">
                {user_menu.map((item, index) =>
                    <ListGroup.Item
                        style={{cursor:'pointer'}}
                        key={index}
                        active={item === selectedMenu}
                        onClick={() => setSelectedMenu(item)}
                        className="p-2"
                    >
                        <div className="d-flex align-items-center gap-4">
                            {user_icons[index]}
                            {item}
                        </div>

                    </ListGroup.Item>
                )}
            </ListGroup>

    );
};

export default ProfileBar;