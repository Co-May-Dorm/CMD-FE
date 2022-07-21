import React from "react"
import NewsFeed from "./views/newsFeed/NewsFeed"

const Posts = React.lazy(() => import("./views/posts/Posts"))
const DetailPost = React.lazy(() => import("./views/posts/DetailPost"))

const Employees = React.lazy(() => import("./views/employees/EmployeesMainPage"))
const Tasks = React.lazy(() => import("./views/tasks/TasksMainPage"))
const Proposal = React.lazy(() => import("./views/proposals/ProposalsMainPage"))

const Info = React.lazy(() => import("./views/info/Info"))

const routes = [
    {
        path: "/",
        name: "Home",
    },
    {
        path: "posts",
        name: "Bảng tin",
        element: <Posts />,
    },
    {
        path: "posts/:id",
        name: "Chi tiết bài viết",
        element: <DetailPost />,
    },
    {
        path: "tasks",
        name: "Tất cả công việc",
        element: <Tasks />,
    },
    {
        path: "proposals",
        name: "Tất cả đề xuất",
        element: <Proposal />,
    },
    {
        path: "employees",
        name: "Nhân viên",
        element: <Employees />,
    },
    {
        path: "info/:id",
        name: "Thông tin tài khoản",
        element: <Info />,
    },
    {
        path: "newsFeeds",
        name: "Bảng tin",
        element: <NewsFeed />,
    },
]

export default routes
