import { Entry, Diagnosis } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const HospitalView = ({entry, diagnosis}: {entry: Entry, diagnosis: Diagnosis[] | undefined}) => {
    return (
        <div>
            <p>{entry.date} <LocalHospitalIcon/></p>
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

export default HospitalView;