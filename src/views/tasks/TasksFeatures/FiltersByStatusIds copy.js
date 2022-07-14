import React, { useState } from 'react'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import { BiFilterAlt } from 'react-icons/bi'

const FiltersByStatusIds = ({ filterByStatusIds, setFilterByStatusIds }) => {
    const [visible, setVisible] = useState(false)
    const handleChange = (e) => {
        const currentStatusId = Number.parseInt(e.target.name)
        let listStatusIds = filterByStatusIds.statusIds
        if (listStatusIds.includes(currentStatusId)) {
            listStatusIds = listStatusIds.filter(statusId => statusId !== currentStatusId)
        }
        else {
            listStatusIds.push(currentStatusId)
        }
        console.log(listStatusIds)
        setFilterByStatusIds({
            statusIds: listStatusIds
        })
    }
    return (
        <>
            <Button variant="primary" onClick={() => setVisible(true)} className="me-2">
                <BiFilterAlt size={30} />
            </Button>
            {
                visible && (
                    <Offcanvas
                        show={visible}
                        onHide={() => setVisible(false)}
                        placement="end"
                        scroll
                        backdrop
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>
                                Lọc
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Form.Check
                                type="switch"
                                name={1}
                                placeholder="Hoàn tất"
                                checked={filterByStatusIds.statusIds.includes(1)}
                                onChange={handleChange}
                            />
                        </Offcanvas.Body>
                    </Offcanvas>
                )
            }
        </>
    )
}

export default FiltersByStatusIds