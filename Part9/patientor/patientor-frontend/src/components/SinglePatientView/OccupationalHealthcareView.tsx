import { Entry, Diagnosis } from "../../types";
import WorkIcon from '@mui/icons-material/Work';

const OccupationalHealthcareView = ({entry, diagnosis}: {entry: Entry, diagnosis: Diagnosis[] | undefined}) => {
    return (
        <div>
            <p>{entry.date} <WorkIcon/></p>
            <p>{entry.description}</p>
            <p>Diagnose by {entry.specialist}</p>
            <ul>
                {entry.diagnosisCodes?.map((c, index) => (
                    <li key={index}>
                        {c} {diagnosis?.find(d => d.code === c)?.name}
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default OccupationalHealthcareView;