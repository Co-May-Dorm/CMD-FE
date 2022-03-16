import React from 'react'
import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import _nav from "../_nav"

const AppNavbarNav = () => {
    return (
        <Nav
            className="col row flex-lg-row justify-content-center"
            style={{ maxHeight: '200px' }}
            navbarScroll
        >
            {
                _nav.map((navItem, index) => (
                    <NavLink
                        key={index}
                        to={navItem.to}
                        className={({ isActive }) =>
                            "btn fw-bold mx-5 col-auto border-light " + (isActive ? "bg-gradient text-white" : "btn-none")
                        }
                    >
                        {navItem.name.toUpperCase()}
                    </NavLink>
                ))
            }
        </Nav>
    )
}

export default AppNavbarNav