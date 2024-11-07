import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

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
  const anecdotes = useSelector(state => state.anecdotes)
  const filterAnecdotes = useSelector(state => state.filter)

  // ordenar anecdotes por numeros de votos
  const filteredAndSortedAnecdotes = [...anecdotes]
    .filter(anecdote =>
      anecdote.content.toLowerCase().includes(filterAnecdotes.toLowerCase())
    )
    .sort((a, b) => b.votes - a.votes)

  const vote = (id, content) => {
    dispatch(voteAnecdote(id, content))
  }

  return (
    <ol>
      {filteredAndSortedAnecdotes.map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote.id, anecdote.content)}
        />
      ))}
    </ol>
  )
}

export default AnecdotesList
