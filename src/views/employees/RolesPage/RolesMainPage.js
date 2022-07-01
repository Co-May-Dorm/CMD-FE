/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Accordion, Modal } from 'react-bootstrap'

import { fetchRoles } from '~/redux/rolesSlice'
import { rolesSelector } from '~/redux/selectors'
import AppPagination from '~/components/AppPagination'
import AppSearch from '~/components/AppSearch'
import RoleItem from './RoleItem'
import AddRole from './RolesFeatures/AddRole'
import Loading from '~/components/Loading'

const RolesMainPage = ({ visible, setVisible }) => {
    const isLoading = useSelector(rolesSelector).status
    const roles = useSelector(rolesSelector).roles
    const pagination = useSelector(rolesSelector).pagination
    const dispatch = useDispatch()
    const [filters, setFilters] = useState({})

    useEffect(() => {
        dispatch(fetchRoles(filters))
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
            name: searchTerm
        })
    }
    return (
        <>
            <Modal
                className="modal-fullheight"
                size="md"
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
                    {
                        isLoading === "loading" ? (
                            <Loading />
                        ) : (
                            <Accordion flush alwaysOpen>
                                {
                                    roles?.map(role => (
                                        <Accordion.Item
                                            eventKey={role.id}
                                            key={role.id}
                                        >
                                            <RoleItem role={role} />
                                        </Accordion.Item>
                                    ))
                                }
                            </Accordion>
                        )
                    }
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

export default RolesMainPage