import { useDispatch } from 'react-redux'
import { addAnecdoteNotification } from '../reducers/anecdoteReducer'
import anecdotesServices from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdotesServices.createNew(content)
    console.log('newAnecdote..', newAnecdote)
    dispatch(addAnecdoteNotification(newAnecdote))
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
