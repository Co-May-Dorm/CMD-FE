import React, { useEffect, useState } from 'react'
import { ListGroup, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../actions/departmentsAction'
import AppSearch from '../../../components/AppSearch'
import DepartmentItem from './DepartmentItem'
import AddDepartment from './SubmitDepartment/AddDepartment'

const Departments = ({ visible, setVisible }) => {
    const departments = useSelector(state => state.departments.data)
    const dispatch = useDispatch()

    const [filters, setFilters] = useState({
        q: ""
    })

    useEffect(() => {
        dispatch(actions.fetchDepartmentsRequest(filters))
    }, [filters])

    const handleSearchTerm = (searchTerm) => {
        setFilters({
            q: searchTerm
        })
    }

    // Chuỗi lệnh hiển thị tên phòng ban phân cấp
    const departmentsElement = []
    const recursiveDepartmentChild = (department_parent, level) => {
        departments?.forEach((department_child) => {
            if (department_parent.id === department_child.parent_id) {
                departmentsElement.push(
                    <DepartmentItem
                        key={department_child.id}
                        level={level}
                        department={department_child}
                    />
                )
                recursiveDepartmentChild(department_child, level + 1)
            }
        })
    }
    const traverseDepartment = () => {
        departments?.forEach((department) => {
            if (!department.parent_id) {
                departmentsElement.push(
                    <DepartmentItem
                        key={department.id}
                        level={1}
                        department={department}
                    />
                )
                recursiveDepartmentChild(department, 2)
            }
        })
    }
    traverseDepartment();
    //

    return (
        <>
            <Modal
                fullscreen
                scrollable
                show={visible}
                onHide={() => setVisible(false)}
            >
                <div className="modal-header row justify-content-between bg-gradient">
                    <div className="col text-white">
                        <Modal.Title>PHÒNG BAN</Modal.Title>
                    </div>
                    <div className="col-auto">
                        <button
                            className="btn-close"
                            onClick={() => setVisible(false)}
                        />
                    </div>
                </div>
                <Modal.Body>
                    <div className="row align-content-between justify-content-between bg-light p-3">
                        <div className="col">
                            <AppSearch onSearch={handleSearchTerm} />
                        </div>
                        <div className="col-auto">
                            <AddDepartment />
                        </div>
                    </div>
                    <ListGroup variant="flush">
                        {departmentsElement}
                    </ListGroup>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Departments