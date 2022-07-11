import React from 'react'
import { Route, Routes } from 'react-router-dom'

import './style.css'
import routes from '../routes'

const AppContent = () => {
    return (
        <div className="container-fluid mt-3">
            <Routes>
                {
                    routes.map((route, index) => {
                        return (
                            route.element && (
                                <Route
                                    key={index}
                                    {...route}
                                />
                            )
                        )
                    })
                }
            </Routes>
        </div>
    )
}

export default React.memo(AppContent)
