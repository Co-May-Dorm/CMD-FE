import React, { useEffect, useState } from 'react'
import { ListGroup, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../actions/departmentsAction'
import AppSearch from '../../../components/AppSearch'
import DepartmentItem from './DepartmentRow'
import AddDepartment from './DepartmentsFeatures/AddDepartment'

const DepartmentsMainPage = ({ visible, setVisible }) => {
    const departments = useSelector(state => state.departments.data)

    const dispatch = useDispatch()

    const [filters, setFilters] = useState({
        name: ""
    })

    useEffect(() => {
        dispatch(actions.fetchDepartmentsRequest(filters))
    }, [filters])

    const handleSearchTerm = (searchTerm) => {
        setFilters({
            name: searchTerm
        })
    }

    // Chuỗi lệnh hiển thị tên phòng phân cấp
    let departmentsElement = []
    const recursiveDepartmentChild = (department_parent, level) => {
        departments?.forEach((department_child) => {
            if (department_parent.id === department_child.fatherDepartmentId) {
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
            if (!department.fatherDepartmentId) {
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
    traverseDepartment()
    //

    return (
        <Modal
            className="modal-fullheight"
            size="md"
            scrollable
            show={visible}
            onHide={() => setVisible(false)}
        >
            <div className="modal-header row justify-content-between">
                <div className="col text-white">
                    <Modal.Title>Phòng</Modal.Title>
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
                        <AppSearch
                            value={filters.name}
                            onSearch={handleSearchTerm}
                        />
                    </div>
                    <div className="col-auto">
                        <AddDepartment />
                    </div>
                </div>
                <ListGroup
                    className="mt-3"
                    variant="flush"
                >
                    {departmentsElement}
                </ListGroup>
            </Modal.Body>
        </Modal>
    )
}

export default DepartmentsMainPage