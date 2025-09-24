import DeleteButton from "./DeleteButton"

const Persons = (props) => {
    const personsToShow = props.showAll 
        ? props.persons 
        : props.persons.filter(person => person.name.includes(props.newFilter))
    
    return (
        personsToShow.map(person => {            
            return (
                <p key={person.id}>
                    {person.name} {person.number}
                    <DeleteButton id={person.id} name={person.name} persons={props.persons} setPersons={props.setPersons}/>
                </p>
            )
        })
    )
}

export default Persons