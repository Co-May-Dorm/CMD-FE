import React from 'react'
import { ListGroup } from 'react-bootstrap'

const SelectPosition = ({ visible, currentPosition, data = [], onPositionChange }) => {
    // Chuỗi lệnh hiển thị tên phòng ban phân cấp
    const showPosition = data.map((postition) => (
        <ListGroup.Item
            action
            key={postition.id}
            onClick={() => onPositionChange(postition)}
            active={currentPosition.name === postition.name}
        >
            {postition.name}
        </ListGroup.Item>
    ))
    //

    return (
        <ListGroup>
            {(visible) ? showPosition : null}
        </ListGroup>
    )
}

export default SelectPosition