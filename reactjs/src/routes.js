import React from 'react'

const Posts = React.lazy(() => import('./views/posts/Posts'))
const DetailPost = React.lazy(() => import('./views/posts/DetailPost'))

const TodoList = React.lazy(() => import('./views/todo-list/TodoList'))
const AssignedToMe = React.lazy(() => import('./views/todo-list/assigned-to-me/AssignedToMe'))
const Requests = React.lazy(() => import('./views/requests/Requests'))
const CreatedByMe = React.lazy(() => import('./views/requests/created-by-me/CreatedByMe'))
const ApproveByMe = React.lazy(() => import('./views/requests/approve-by-me/ApproveByMe'))
const Employees = React.lazy(() => import('./views/employees/Employees'))

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
        path: 'todo-list',
        name: 'Tất cả công việc',
        element: TodoList
    },
    {
        path: 'todo-list/assigned-to-me',
        name: 'Công việc của tôi',
        element: AssignedToMe
    },
    {
        path: 'requests',
        name: 'Tất cả đề xuất',
        element: Requests,
    },
    {
        path: 'requests/created-by-me',
        name: 'Đề xuất của tôi',
        element: CreatedByMe
    },
    {
        path: 'requests/approve-by-me',
        name: 'Đề xuất tôi duyệt',
        element: ApproveByMe
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