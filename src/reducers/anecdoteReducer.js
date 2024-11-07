import { createSlice } from '@reduxjs/toolkit'
import { setTemporaryNotification } from './reducerNotification'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push({
        content,
        id: getId(),
        votes: 0,
      })
    },
    toggleVoteOf(state, action) {
      const id = action.payload
      const anecdoteVote = state.find(n => n.id === id)
      if (anecdoteVote) {
        anecdoteVote.votes += 1
      }
    },
  },
})

export const voteAnecdote = (id, content) => {
  return async dispatch => {
    dispatch(anecdoteSlice.actions.toggleVoteOf(id))
    dispatch(setTemporaryNotification(`You voted for: "${content}"`, 5))
  }
}

export const addAnecdoteNotification = content => {
  return async dispatch => {
    console.log(content)
    dispatch(anecdoteSlice.actions.createAnecdote(content))
    dispatch(
      setTemporaryNotification(`You added a new anecdote: "${content}"`, 5)
    )
  }
}

export const { createAnecdote, toggleVoteOf } = anecdoteSlice.actions
export default anecdoteSlice.reducer
