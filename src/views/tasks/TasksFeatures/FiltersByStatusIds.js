import React, { useEffect, useState } from 'react'
import { Dropdown, Form } from 'react-bootstrap'
import { BiFilterAlt } from 'react-icons/bi'
import tasksApi from '~/api/tasksApi'

const FiltersByStatusIds = ({ filterByStatusIds, setFilterByStatusIds }) => {
    const [statuses, setStatuses] = useState([])

    useEffect(() => {
        tasksApi.getStatusList()
            .then((response) => {
                setStatuses(response.data.data)
            })
    }, [])

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
                        {
                            statuses.map((status) => (
                                <Form.Check
                                    key={status.id}
                                    type="switch"
                                    name={status.id}
                                    label={status.name}
                                    checked={filterByStatusIds.statusIds.includes(status.id)}
                                    onChange={handleChange}
                                />
                            ))
                        }
                    </Dropdown.ItemText>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default FiltersByStatusIds