import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

export const login = createAsyncThunk(
  'user/login',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const user = await loginService.login(credentials)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      dispatch(showNotification("Successful Login", 5, false))
      return user
    } catch (err) {
      const msg = err?.response?.data?.error || 'Invalid username or password'
      dispatch(showNotification("Wrong Username or Password", 5, true))
      return rejectWithValue(msg)
    }
  }
)

export const initUser = createAsyncThunk('user/init', async (_, { dispatch }) => {
  const json = window.localStorage.getItem('loggedBlogAppUser')
  if (!json) return null
  const user = JSON.parse(json)
  blogService.setToken(user.token)
  return user
})

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    logout() {
      window.localStorage.removeItem('loggedBlogAppUser')
      blogService.setToken(null)
      return null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (_, action) => action.payload)
      .addCase(login.rejected, () => null)
      .addCase(initUser.fulfilled, (_, action) => action.payload)
  },
})

export const { logout } = userSlice.actions
export default userSlice.reducer
