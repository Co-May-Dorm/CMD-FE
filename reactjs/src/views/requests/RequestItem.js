import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { BsFileLock, BsFillCircleFill, BsThreeDotsVertical } from "react-icons/bs"
import EditRequest from './SubmitRequest/EditRequest'

const EmployeeItem = ({ request }) => {
    const showDate = () => {
        const dateOfBirth = new Date(request.created_at)
        return "" + (dateOfBirth.getDate() < 10 ? "0" : "") + dateOfBirth.getDate() + "/" + (dateOfBirth.getMonth() + 1 < 10 ? "0" : "") + (dateOfBirth.getMonth() + 1) + "/" + dateOfBirth.getFullYear()
    }
    return (
        <tr>
            <td></td>
            <td>{request.requester.name}</td>
            <td>{request.reqtype.name}</td>
            <td>{request.request_reason}</td>
            <td>{showDate()}</td>
            <td>{request.reqtype.statuses[0].name}</td>
            <td>
                <Dropdown placement="left-start">
                    <Dropdown.Toggle variant="none">
                        <BsThreeDotsVertical />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <EditRequest request={request} />
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    )
}

export default EmployeeItem