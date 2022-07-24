import React from 'react'
import { Route, Routes } from 'react-router-dom'

import './style.css'
import routes from '../routes'

const AppContent = () => {
    return (
        <div className="container-fluid mt-3">
            <Routes>
                {
                    routes.map((route) => {
                        return (
                            route.element && (
                                <Route
                                    key={route.name}
                                    {...route}
                                >
                                    {
                                        route.children && route.children.length > 0 && route.children.map((children) => (
                                            <Route
                                                key={children.name}
                                                {...children}
                                            />
                                        ))
                                    }
                                </Route>
                            )
                        )
                    })
                }
            </Routes>
        </div>
    )
}

export default React.memo(AppContent)
