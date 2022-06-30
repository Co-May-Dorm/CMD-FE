import { configureStore } from '@reduxjs/toolkit'
import departmentsSlice from './departmentsSlice'
import postsSlice from './postsSlice'
import requestsSlice from './requestsSlice'
import rolesSlice from './rolesSlice'
import employeesSlice from './employeesSlice'
import teamsSlice from './teamsSlice'
import tasksSlice from './tasksSlice'

const store = configureStore({
    reducer: {
        posts: postsSlice.reducer,
        employees: employeesSlice.reducer,
        departments: departmentsSlice.reducer,
        teams: teamsSlice.reducer,
        roles: rolesSlice.reducer,
        requests: requestsSlice.reducer,
        tasks: tasksSlice.reducer
    }
})

export default store