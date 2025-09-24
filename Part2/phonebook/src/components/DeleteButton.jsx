import personService from '../services/personsServices'

const DeleteButton = (props) => {
    return (
        <button onClick={() => {
            if(confirm(`Delete ${props.name} ?`)) {
                personService.deletePerson(props.id).then(returnedPerson => {
                props.setPersons(props.persons.filter(person => person.id !== props.id))
                })
                .catch(error => alert(`Person with id=${props.id} not found!`))
            }
        }}>Delete</button>
    )
}

export default DeleteButton