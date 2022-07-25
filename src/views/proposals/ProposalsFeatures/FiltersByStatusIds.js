import React from 'react'
import { Dropdown, Form } from 'react-bootstrap'
import { BiFilterAlt } from 'react-icons/bi'

const FiltersByStatusIds = ({ filterByStatusIds, setFilterByStatusIds }) => {
    const handleChange = (e) => {
        const currentStatusId = Number.parseInt(e.target.name)
        let listStatusIds = filterByStatusIds.statusIds
        if (listStatusIds.includes(currentStatusId)) {
            listStatusIds = listStatusIds.filter(statusId => statusId !== currentStatusId)
        }
        else {
            listStatusIds.push(currentStatusId)
        }
        setFilterByStatusIds({
            statusIds: listStatusIds
        })
    }
    return (
        <>
            <Dropdown >
                <Dropdown.Toggle autoclose="outside" variant="none">
                    <BiFilterAlt size={30} />
                </Dropdown.Toggle>
                <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
                <Dropdown.ItemText>
                    <Form.Check
                        type="switch"
                        name={1}
                        label="Hoàn tất"
                        checked={filterByStatusIds.statusIds.includes(1)}
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="switch"
                        name={2}
                        label="Bị từ chối"
                        checked={filterByStatusIds.statusIds.includes(2)}
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="switch"
                        name={3}
                        label="Đã hủy"
                        checked={filterByStatusIds.statusIds.includes(3)}
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="switch"
                        name={4}
                        label="Mới"
                        checked={filterByStatusIds.statusIds.includes(4)}
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="switch"
                        name={5}
                        label="Đang làm"
                        checked={filterByStatusIds.statusIds.includes(5)}
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="switch"
                        name={6}
                        label="Chờ xác nhận"
                        checked={filterByStatusIds.statusIds.includes(6)}
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="switch"
                        name={7}
                        label="Hoàn thành"
                        checked={filterByStatusIds.statusIds.includes(7)}
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="switch"
                        name={8}
                        label="Quá hạn"
                        checked={filterByStatusIds.statusIds.includes(8)}
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="switch"
                        name={9}
                        label="Chờ"
                        checked={filterByStatusIds.statusIds.includes(9)}
                        onChange={handleChange}
                    />
                </Dropdown.ItemText>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default FiltersByStatusIds