import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    cleanNotification() {
      return ''
    },
  },
})

export const setTemporaryNotification = (message, timeInSeconds) => {
  return async dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(cleanNotification())
    }, timeInSeconds * 1000)
  }
}

export const { setNotification, cleanNotification } = notificationSlice.actions
export default notificationSlice.reducer
