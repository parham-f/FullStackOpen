import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../NotificationContext'
import axios from 'axios'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const createAnecdote = newAnecdote => axios.post('http://localhost:3001/anecdotes', newAnecdote).then(res => res.data)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: () => {
      dispatch({type: 'SET', payload: `Too short anecdote, must have length 5 or more!`})
      setTimeout(() => {
        dispatch({type: 'UNSET'})
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
    dispatch({type: 'SET', payload: `You added '${content}'!`})
    setTimeout(() => {
      dispatch({type: 'UNSET'})
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
