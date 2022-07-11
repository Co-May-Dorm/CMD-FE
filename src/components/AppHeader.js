import React from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Image, Navbar } from 'react-bootstrap'

import AppNavbarNav from './AppNavbarNav'
import AppNotification from './AppNotification'
import AppHeaderDropdown from './header/AppHeaderDropdown'
import logo from "~/assets/brand/logo-full.png"

const AppHeader = () => {
    return (
        <Navbar
            id="navbarHeader"
            bg="light"
            expand="lg"
            sticky="top"
        >
            <Container fluid>
                <Navbar.Brand>
                    <NavLink to="/">
                        <Image
                            src={logo}
                            width="120"
                            height="50"
                            className="d-inline-block align-top"
                        />
                    </NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <AppNavbarNav />
                    <AppNotification />
                    <AppHeaderDropdown />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default React.memo(AppHeader)
