import { Patient, Diagnosis, Entry } from "../../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import EntriesView from "./EntriesView";
import EntryForm from "./EntryForm";
import { useEffect, useState } from "react";

const SinglePatientView = ({patient, diagnosis}: {patient: Patient | null | undefined, diagnosis: Diagnosis[] | undefined}) => {    
    const [current, setCurrent] = useState<Patient | null>(patient ?? null);
    
    useEffect(() => {
        setCurrent(patient ?? null);
    }, [patient]);

    if (!current) return null;

    let genderIcon;
    switch (current?.gender) {
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

    const handleEntryAdded = (entry: Entry) => {
        setCurrent(prev =>
        prev ? { ...prev, entries: [ ...(prev.entries ?? []), entry ] } : prev
        );
    };

    return (
        <div>
            <h2>
                {current?.name}
                {genderIcon}
            </h2>
            <p>Date of Birth: {current.dateOfBirth}</p>
            <p>SSN: {current.ssn}</p>
            <p>Occupation: {current.occupation}</p>
            <EntryForm patientId={current.id} onAdded={handleEntryAdded}/>
            <EntriesView patient={current} diagnosis={diagnosis}/>
        </div>
    );
};

export default SinglePatientView;