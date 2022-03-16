import React, { useEffect, useState } from 'react'
import { Accordion, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../actions/rolesAction'
import AppPagination from '../../../components/AppPagination'
import AppSearch from '../../../components/AppSearch'
import RoleItem from './RoleItem'
import AddRole from './SubmitRole/AddRole'

const Roles = ({ visible, setVisible }) => {
    const roles = useSelector(state => state.roles.data)
    const pagination = useSelector(state => state.roles.pagination)
    const dispatch = useDispatch()

    const [filters, setFilters] = useState({
        q: ""
    })

    useEffect(() => {
        document.title = "Vai trò - Cảnh Báo Sớm"
    }, [])
    useEffect(() => {
        dispatch(actions.fetchRolesRequest(filters))
    }, [filters])

    const handlePageChange = newPage => {
        setFilters({
            ...filters,
            page: newPage
        })
    }
    const handleSearchTerm = searchTerm => {
        setFilters({
            ...filters,
            page: 1,
            q: searchTerm
        })
    }
    return (
        <>
            <Modal
                fullscreen
                scrollable
                show={visible}
                onHide={() => setVisible(false)}
            >
                <Modal.Header closeButton className="bg-gradient">
                    <Modal.Title>VAI TRÒ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row align-content-between justify-content-between bg-light p-3">
                        <div className="col">
                            <AppSearch onSearch={handleSearchTerm} />
                        </div>
                        <div className="col-auto">
                            <AddRole />
                        </div>
                    </div>
                    <Accordion flush alwaysOpen>
                        {
                            roles?.map(role => (
                                <Accordion.Item eventKey={role.id} key={role.id}>
                                    <RoleItem role={role} />
                                </Accordion.Item>
                            ))
                        }
                    </Accordion>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <AppPagination
                        pagination={pagination}
                        onPageChange={handlePageChange}
                    />
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Roles