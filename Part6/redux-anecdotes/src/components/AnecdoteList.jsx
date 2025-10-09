import {useSelector, useDispatch} from 'react-redux'
import {setVote} from '../reducers/anecdoteReducer'
import {showNotification} from '../reducers/notificationReducer'

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
        dispatch(setVote(anecdote))
        dispatch(showNotification(`You voted '${anecdote.content}'`, 5))
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