import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      state = action.payload
      return state
    },
    removeNotification(state) {
      state = ''
      return state
    }
  }
})

export const {setNotification, removeNotification} = notificationSlice.actions

export const showNotification = (message, second) => {
  return async dispatch => {
    dispatch(setNotification(message))
      setTimeout(() => {
        dispatch(removeNotification())
      }, second*1000) 
  }
}

export default notificationSlice.reducer