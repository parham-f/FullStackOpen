import { Patient } from "../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';

const SinglePatientView = ({patient}: {patient: Patient | null | undefined}) => {
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
        </div>
    );
};

export default SinglePatientView;