import {useDispatch} from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {setNotification, removeNotification} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addNew = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`You added '${content}'`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000) 
    }
    return (
        <form onSubmit={addNew}>
            <div><input name='anecdote'/></div>
            <button type="submit">create</button>
        </form>
    )
}

export default AnecdoteForm