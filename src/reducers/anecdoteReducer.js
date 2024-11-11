import { createSlice } from '@reduxjs/toolkit'
import { setTemporaryNotification } from './reducerNotification'
import anecdotesServices from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    toggleVoteOf(state, action) {
      const updateAnecdote = action.payload

      return state.map(anecdote =>
        anecdote.id === updateAnecdote.id ? updateAnecdote : anecdote
      )
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

export const voteAnecdote = (id, content, votes) => {
  return async dispatch => {
    const updateAnecdote = await anecdotesServices.updateVote(id, {
      content,
      votes: votes + 1,
    })
    dispatch(toggleVoteOf(updateAnecdote))
    dispatch(setTemporaryNotification(`You voted for: "${content}"`, 5))
  }
}

export default anecdoteSlice.reducer
