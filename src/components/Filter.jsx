import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispacth = useDispatch()
  const handleChange = (event) => {
    dispacth(setFilter(event.target.value))
  }
  const style = {
    marginBottom: 10,
  }
  return (
    <div style={style}>
      <label>Filter</label>
      <input onChange={handleChange} name='filter' type='text' />
    </div>
  )
}

export default Filter
