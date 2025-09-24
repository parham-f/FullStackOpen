const Persons = (props) => {
    const personsToShow = props.showAll 
        ? props.persons 
        : props.persons.filter(person => person.name.includes(props.newFilter))
    return (
        personsToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>)
    )
}

export default Persons