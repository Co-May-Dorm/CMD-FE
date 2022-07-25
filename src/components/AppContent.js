import React from 'react'
import { useRoutes } from 'react-router-dom'

import './style.css'
import routes from '../routes'

const AppContent = () => {
    const routesElement = useRoutes(routes)
    return (
        <div className="container-fluid mt-3">
            {routesElement}
        </div>
    )
}

export default React.memo(AppContent)
