require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const app = express()
app.use(express.json())

app.use(express.static('dist'))

const morgan = require('morgan')
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(person => {
    response.json(person)
  })
})

app.get('/info', (request, response) => {
  Person.countDocuments({})
   .then(count => {
    response.send(
    `<p>Phonebook has info for ${count} people</p>
    <p>${Date()}</p>`
    )
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  }) 
  .catch(error => {
        response.statusMessage = "Selected person does not exist!"
        response.status(404).end()
  })
})

// app.delete('/api/persons/:id', (request, response) => {
//   const id = request.params.id
//   persons = persons.filter(person => person.id !== id)
//   response.status(204).end()
// })

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name/number missing' 
    })
  }
  // if (persons.some(person => person.name === body.name)) {
  //   return response.status(400).json({ 
  //     error: 'name must be unique' 
  //   })
  // }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})