import { combineReducers } from 'redux'
import employeesReducer from './employeesReducer'
import departmentsReducer from './departmentsReducer'
import rolesReducer from './rolesReducer'
import todoListReducer from './todoListReducer'
import requestsReducer from './requestsReducer'
import postsReducer from './postsReducer'
const rootReducer = combineReducers({
    posts: postsReducer,
    employees: employeesReducer,
    departments: departmentsReducer,
    roles: rolesReducer,
    requests: requestsReducer,
    TodoListReducer: todoListReducer
});
export default rootReducer