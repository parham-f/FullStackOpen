import {useSelector, useDispatch} from 'react-redux'
import {addVote} from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({filter, anecdotes}) =>
        filter === '' 
        ? anecdotes 
        : anecdotes.filter(a => a.content.includes(filter)))

    const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(addVote(id))
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
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
      </div>
    )
}

export default AnecdoteList