import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  isError: false
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return {
        ...state,
        message: action.payload
      }
    },
    removeNotification(state) {
      return {
        ...state,
        message: ''
      }
    },
    changeError(state, action) {
      return {
        ...state,
        isError: action.payload
      }
    }
  }
})

export const {setNotification, removeNotification, changeError} = notificationSlice.actions

export const showNotification = (message, second, isError) => {
  return async dispatch => {
    dispatch(setNotification(message))
    dispatch(changeError(isError))
    setTimeout(() => {
      dispatch(removeNotification())
    }, second*1000)

  }
}

export default notificationSlice.reducer