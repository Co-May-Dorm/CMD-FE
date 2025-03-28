import { configureStore } from '@reduxjs/toolkit'

import authSlice from './authSlice'
import postsSlice from './postsSlice'
import employeesSlice from './employeesSlice'
import departmentsSlice from './departmentsSlice'
import teamsSlice from './teamsSlice'
import rolesSlice from './rolesSlice'
import proposalsSlice from './proposalsSlice'
import tasksSlice from './tasksSlice'

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        posts: postsSlice.reducer,
        employees: employeesSlice.reducer,
        departments: departmentsSlice.reducer,
        teams: teamsSlice.reducer,
        roles: rolesSlice.reducer,
        tasks: tasksSlice.reducer,
        proposals: proposalsSlice.reducer
    }
})

export default store