import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import useReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: useReducer,
    notification: notificationReducer
  }
})

export default store