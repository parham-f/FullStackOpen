import { Entry, Diagnosis, HealthCheckRating } from "../../types";
import HealthCheckRatingView from "./HealthCheckRatingView";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const HealthCheckView = ({entry, diagnosis, rating}: {entry: Entry, diagnosis: Diagnosis[] | undefined, rating: HealthCheckRating}) => {
    return (
        <div>
            <p>{entry.date} <MedicalServicesIcon/></p>
            <p>{entry.description}</p>
            <HealthCheckRatingView rating={rating}/>
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

export default HealthCheckView;