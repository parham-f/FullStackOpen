import { Patient, Diagnosis } from "../../types";
import EntryDetails from "./EntryDetails";

const EntriesView = ({patient, diagnosis}: {patient: Patient | null | undefined, diagnosis: Diagnosis[] | undefined}) => {
    const style = {
        border: 'solid 1px',
        borderRadius: '10px',
        marginBottom: '2px',
        paddingLeft: '5px'
    };
    
    return (
        <div>
            <h3>Entries</h3>
            {patient?.entries.map(e => (
                <div key={e.id} style={style}>
                    <EntryDetails entry={e} diagnosis={diagnosis}/>
                </div>
            ))}
        </div>
    );
};

export default EntriesView;