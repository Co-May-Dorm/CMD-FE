/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ListGroup, Modal } from 'react-bootstrap'

import { getDepartmentList } from '../../../redux/departmentsSlice'
import { departmentsSelector } from '../../../redux/selectors'
import AppSearch from '../../../components/AppSearch'
import DepartmentRow from './DepartmentRow'
import AddDepartment from './DepartmentsFeatures/AddDepartment'
import Loading from '~/components/Loading'

const DepartmentsMainPage = ({ visible, setVisible }) => {
    const status = useSelector(departmentsSelector).status
    const departments = useSelector(departmentsSelector).departments

    const dispatch = useDispatch()

    const [filters, setFilters] = useState({
        name: ""
    })

    useEffect(() => {
        dispatch(getDepartmentList(filters))
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
                    <DepartmentRow
                        key={department_child.id}
                        departmentInfo={department_child}
                    />
                )
                recursiveDepartmentChild(department_child, level + 1)
            }
        })
    }
    const traverseDepartment = () => {
        departments?.forEach((department) => {
            if (department.fatherDepartmentId === -1) {
                departmentsElement.push(
                    <DepartmentRow
                        key={department.id}
                        departmentInfo={department}
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
            <Modal.Header closeButton>
                <Modal.Title>
                    Phòng ban
                </Modal.Title>
            </Modal.Header>
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
                {
                    status === "loading" ? (
                        <Loading />
                    ) : (
                        <ListGroup
                            className="mt-3"
                            variant="flush"
                        >
                            {departmentsElement}
                        </ListGroup>
                    )
                }
            </Modal.Body>
        </Modal>
    )
}

export default DepartmentsMainPage