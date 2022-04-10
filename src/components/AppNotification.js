import React from 'react'

import { Dropdown } from 'react-bootstrap'

import notificationIcon from '../assets/icons/notification.svg'

const AppNotification = () => {
    return (
        <Dropdown className="col-auto">
            <Dropdown.Toggle variant="none">
                <img src={notificationIcon} />
            </Dropdown.Toggle>
            <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
                
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default AppNotification