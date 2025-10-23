import { Patient, Diagnosis } from "../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';

const SinglePatientView = ({patient, diagnosis}: {patient: Patient | null | undefined, diagnosis: Diagnosis[] | undefined}) => {
    let genderIcon;
    switch (patient?.gender) {
        case 'male':
            genderIcon = <MaleIcon/>;
            break;
        case 'female':
            genderIcon = <FemaleIcon/>;
            break;
        case 'other':
            genderIcon = <PanoramaFishEyeIcon/>;
            break;
        default:
            return null;
    }

    return (
        <div>
            <h2>
                {patient?.name}
                {genderIcon}
            </h2>
            <p>Date of Birth: {patient.dateOfBirth}</p>
            <p>SSN: {patient.ssn}</p>
            <p>Occupation: {patient.occupation}</p>
            <h3>Entries</h3>
            {patient.entries.map(e => (
                <div key={e.id}>
                    <p>{e.date} {e.description}</p>
                    <ul>
                        {e.diagnosisCodes?.map((c, index) => (
                            <li key={index}>
                                {c} {diagnosis?.find(d => d.code === c)?.name}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default SinglePatientView;