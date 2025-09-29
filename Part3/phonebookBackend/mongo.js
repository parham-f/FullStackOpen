const mongoose = require('mongoose')

const usage = `* For fetching all data:
    - node mongo.js <password>
* For adding data:
    - node mongo.js <password> <name> <number>`

if (process.argv.length < 3) {
  console.log(usage)
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://parham_db_user:${password}@cluster0.8ozqggw.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// personSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('PhoneBook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const argName = process.argv[3]
  const argNumber = process.argv[4]

  const person = new Person({
    name: argName,
    number: argNumber
  })

  person.save().then(() => {
    console.log(`added ${argName} number ${argNumber} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log(usage)
  mongoose.connection.close()
  process.exit(1)
}