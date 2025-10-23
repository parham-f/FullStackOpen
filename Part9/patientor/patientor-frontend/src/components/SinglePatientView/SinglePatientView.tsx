import { Patient, Diagnosis } from "../../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import EntriesView from "./EntriesView";
import { Button } from '@mui/material';


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
            <EntriesView patient={patient} diagnosis={diagnosis}/>
            <Button variant="contained">
                Add New Entry
            </Button>
        </div>
    );
};

export default SinglePatientView;