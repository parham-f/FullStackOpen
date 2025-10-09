import {useDispatch} from 'react-redux'
import {addAnecdote} from '../reducers/anecdoteReducer'
import {setNotification, removeNotification} from '../reducers/notificationReducer'
import anecdoteServices from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addNew = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteServices.createNew(content)
        dispatch(addAnecdote(newAnecdote))
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