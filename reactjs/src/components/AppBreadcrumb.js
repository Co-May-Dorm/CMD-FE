import React from 'react'
import { useLocation } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import routes from '../routes'

const AppBreadcrumb = () => {
    const currentLocation = useLocation().pathname

    const getRouteName = (pathname, routes) => {
        const currentRoute = routes.find((route) => route.path === pathname)
        return currentRoute.name
    }

    const getBreadcrumbs = (location) => {
        const breadcrumbs = []
        location.split('/').reduce((prev, curr, index, array) => {
            const currentPathname = `${prev}/${curr}`
            breadcrumbs.push({
                pathname: currentPathname,
                name: getRouteName(currentPathname, routes),
                active: index + 1 === array.length ? true : false,
            })
            return currentPathname
        })
        return breadcrumbs
    }

    const breadcrumbs = getBreadcrumbs(currentLocation)

    return (
        <Breadcrumb className="m-0 ms-2">
            <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
            {breadcrumbs.map((breadcrumb, index) => {
                return (
                    <Breadcrumb.Item
                        {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
                        key={index}
                    >
                        {breadcrumb.name}
                    </Breadcrumb.Item>
                )
            })}
        </Breadcrumb>
    )
}

export default React.memo(AppBreadcrumb)
