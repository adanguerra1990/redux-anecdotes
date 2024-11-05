import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'This is the initial notification message',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    cleanNotification() {
      return ''
    },
  },
})

export const { setNotification, cleanNotification } = notificationSlice.actions
export default notificationSlice.reducer
