import { createSlice } from '@reduxjs/toolkit'
import { setTemporaryNotification } from './reducerNotification'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const newAnecdote = action.payload
      state.push(newAnecdote)
    },
    toggleVoteOf(state, action) {
      const id = action.payload
      const anecdoteVote = state.find(n => n.id === id)
      if (anecdoteVote) {
        anecdoteVote.votes += 1
      }
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const voteAnecdote = (id, content) => {
  return async dispatch => {
    dispatch(anecdoteSlice.actions.toggleVoteOf(id))
    dispatch(setTemporaryNotification(`You voted for: "${content}"`, 5))
  }
}

export const addAnecdoteNotification = newAnecdote => {
  return async dispatch => {
    dispatch(anecdoteSlice.actions.createAnecdote(newAnecdote))
    dispatch(
      setTemporaryNotification(
        `You added a new anecdote: "${newAnecdote.content}"`,
        5
      )
    )
  }
}

export const { createAnecdote, toggleVoteOf, setAnecdotes } =
  anecdoteSlice.actions
export default anecdoteSlice.reducer
