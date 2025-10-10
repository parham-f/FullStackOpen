import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useNotificationDispatch } from './NotificationContext'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {

  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newVoteMutation = useMutation({
    mutationFn: (content) => axios.put(`http://localhost:3001/anecdotes/${content.id}`, content).then(res => res.data),
    onSuccess: (content) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(a => a.id === content.id ? content : a))
    },
  })

  const handleVote = (anecdote) => {
    const content = {...anecdote, votes: anecdote.votes + 1}
    newVoteMutation.mutate(content)
    dispatch({type: 'SET', payload: `You voted '${anecdote.content}'!`})
    setTimeout(() => {
      dispatch({type: 'UNSET'})
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => axios.get('http://localhost:3001/anecdotes').then(res => res.data),
    retry: false,
    refetchOnWindowFocus: false
  })

  if ( result.isPending ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>Anecdote service not available due to problems in server!</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
