import React from "react"

const NewsFeed = React.lazy(() => import("~/views/newsFeed/NewsFeed"))

const Employees = React.lazy(() => import("~/views/employees/EmployeesMainPage"))

const Tasks = React.lazy(() => import("~/views/tasks/TasksMainPage"))
const TasksCreatedByMe = React.lazy(() => import("~/views/tasks/TasksCreatedByMe"))
const TasksAssignedToMe = React.lazy(() => import("~/views/tasks/TasksAssignedToMe"))

const ProposalsForAll = React.lazy(() => import("~/views/proposals/ProposalsForAll"))
const ProposalsCreatedByMe = React.lazy(() => import("~/views/proposals/ProposalsCreatedByMe"))
const ProposalsApproveByMe = React.lazy(() => import("~/views/proposals/ProposalsApproveByMe"))

const ProposalTypes = React.lazy(() => import("~/views/configs/proposal-types/ProposalTypesMainPage"))

const Info = React.lazy(() => import("~/views/info/Info"))

const routes = [
    {
        name: "Trang chủ",
        path: "/",
        element: <NewsFeed />
    },
    {
        path: "newsFeeds/",
        name: "Bảng tin",
        element: <NewsFeed />
    },
    {
        name: "Tất cả công việc",
        path: "tasks",
        element: <Tasks />
    },
    {
        name: "Công việc tôi giao",
        path: "tasks/created-by-me",
        element: <TasksCreatedByMe />
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
        path: "configs",
        name: "Thiết lập chung",
        element: <ProposalTypes />
    }
]

export default routes
