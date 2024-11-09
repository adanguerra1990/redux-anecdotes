import { createSlice } from '@reduxjs/toolkit'
import { setTemporaryNotification } from './reducerNotification'
import anecdotesServices from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
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
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
  },
})

export const { toggleVoteOf, setAnecdotes, appendAnecdote } =
  anecdoteSlice.actions

export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesServices.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesServices.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
    dispatch(
      setTemporaryNotification(
        `You added a new anecdote: "${newAnecdote.content}"`,
        5
      )
    )
  }
}

export const voteAnecdote = (id, content) => {
  return async dispatch => {
    dispatch(anecdoteSlice.actions.toggleVoteOf(id))
    dispatch(setTemporaryNotification(`You voted for: "${content}"`, 5))
  }
}

export default anecdoteSlice.reducer
