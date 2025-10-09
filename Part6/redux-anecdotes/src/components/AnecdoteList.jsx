import {useSelector, useDispatch} from 'react-redux'
import {addVote} from '../reducers/anecdoteReducer'
import {setNotification, removeNotification} from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const filtered = filter
                    ? anecdotes.filter(a =>
                        a.content.includes(filter)
                    )
                    : anecdotes
    const sortedAnecdotes = [...filtered].sort((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(addVote(anecdote.id))
        dispatch(setNotification(`You voted '${anecdote.content}'`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000) 
    }
    
    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
                </div>
            )}
      </div>
    )
}

export default AnecdoteList