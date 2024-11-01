import { useDispatch, useSelector } from 'react-redux'
import { toggleVoteOf } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      <p>{anecdote.content}</p>
      <div>
        <span>has {anecdote.votes}</span>
        <button onClick={handleClick}>vote</button>
      </div>
    </li>
  )
}

const AnecdotesList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state)

  // ordenar anecdotes por numeros de votos
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  const vote = (id) => {
    dispatch(toggleVoteOf(id))
  }

  return (
    <ol>
      {sortedAnecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote.id)}
        />
      ))}
    </ol>
  )
}

export default AnecdotesList
