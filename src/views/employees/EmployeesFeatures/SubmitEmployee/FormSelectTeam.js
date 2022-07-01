import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { Form, ListGroup } from 'react-bootstrap'

import { teamsSelector } from '../../../../redux/selectors'
import useOnClickOutside from '../../../../customHooks/useOnClickOutside'

const FormSelectTeam = ({ index, currentTeam, onTeamChange }) => {
    const teams = useSelector(teamsSelector).teams
    const [visible, setVisible] = useState(false)       // State quản lý hiển thị danh sách phòng ban

    const ref = useRef()        // Ref form select team

    useOnClickOutside(ref, () => setVisible(false))     // Hàm xử lý đóng form select team khi click ra ngoài


    return (
        <div
            ref={ref}
            onClick={() => setVisible(!visible)}
            className="form-select"
        >
            <input
                type="text"
                name="phoneNumber"
                placeholder="Chọn CLB/Đội nhóm"
                value={currentTeam?.name || ""}
                readOnly
                required
                style={{
                    width: "100%",
                    backgroundColor: "none",
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    color: "#2f6bb1",
                    padding: "0"
                }}
            />
            <Form.Control.Feedback type="invalid">
                Vui lòng chọn phòng ban
            </Form.Control.Feedback>

            <div className="select">
                {(visible) ? teams.map((team, index) => (
                    <ListGroup.Item
                        action
                        key={index}
                        onClick={() => onTeamChange(index, team)}
                        active={currentTeam?.id === team.id}
                    >
                        {team.name}
                    </ListGroup.Item>
                )) : null}
            </div>
        </div>
    )
}

export default FormSelectTeam