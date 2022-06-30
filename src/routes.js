import React from 'react'

const Posts = React.lazy(() => import('./views/posts/Posts'))
const DetailPost = React.lazy(() => import('./views/posts/DetailPost'))

const Employees = React.lazy(() => import('./views/employees/EmployeesMainPage'))
const Tasks = React.lazy(() => import('./views/tasks/TasksMainPage'))
const Requests = React.lazy(() => import('./views/requests/RequestsMainPage'))

const Info = React.lazy(() => import('./views/info/Info'))

const routes = [
    {
        path: '/',
        name: 'Home',
    },
    {
        path: 'posts',
        name: 'Bảng tin',
        element: Posts
    },
    {
        path: 'posts/:id',
        name: 'Chi tiết bài viết',
        element: DetailPost
    },
    {
        path: 'tasks',
        name: 'Tất cả công việc',
        element: Tasks
    },
    {
        path: 'requests',
        name: 'Tất cả đề xuất',
        element: Requests,
    },
    {
        path: 'employees',
        name: 'Nhân viên',
        element: Employees,
    },
    {
        path: 'info/:id',
        name: 'Thông tin tài khoản',
        element: Info,
    },
]

export default routes