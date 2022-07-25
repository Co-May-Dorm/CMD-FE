import React from "react"

const NewsFeed = React.lazy(() => import("~/views/newsFeed/NewsFeed"))

const Employees = React.lazy(() => import("~/views/employees/EmployeesMainPage"))

const Tasks = React.lazy(() => import("~/views/tasks/TasksMainPage"))
const TasksAssignedToMe = React.lazy(() => import("~/views/tasks/TasksAssignedToMe"))

const ProposalsForAll = React.lazy(() => import("~/views/proposals/ProposalsForAll"))
const ProposalsCreatedByMe = React.lazy(() => import("~/views/proposals/ProposalsCreatedByMe"))
const ProposalsApproveByMe = React.lazy(() => import("~/views/proposals/ProposalsApproveByMe"))

const Info = React.lazy(() => import("~/views/info/Info"))

const routes = [
    {
        name: "Home",
        path: "newsFeeds"
    },
    {
        name: "Tất cả công việc",
        path: "tasks",
        element: <Tasks />
    },
    {
        name: "Công việc của tôi",
        path: "tasks/assigned-to-me",
        element: <TasksAssignedToMe />
    },
    {
        name: "Tất cả đề xuất",
        path: "proposals",
        element: <ProposalsForAll />
    },
    {
        name: "Đề xuất của tôi",
        path: "proposals/created-by-me",
        element: <ProposalsCreatedByMe />
    },
    {
        name: "Đề xuất tôi duyệt",
        path: "proposals/approve-by-me",
        element: <ProposalsApproveByMe />
    },
    {
        path: "employees",
        name: "Nhân viên",
        element: <Employees />
    },
    {
        path: "info/:id",
        name: "Thông tin tài khoản",
        element: <Info />
    },
    {
        path: "newsFeeds/",
        name: "Bảng tin",
        element: <NewsFeed />
    }
]

export default routes
