import { Entry, Diagnosis } from "../../types";
import HospitalView from "./HospitalView";
import HealthCheckView from "./HealthCheckView";
import OccupationalHealthcareView from "./OccupationalHealthcareView";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({entry, diagnosis}: {entry: Entry, diagnosis: Diagnosis[] | undefined}) => {
    switch (entry.type) {
        case 'Hospital':
            return <HospitalView entry={entry} diagnosis={diagnosis}/>;
        case 'HealthCheck':
            return <HealthCheckView entry={entry} diagnosis={diagnosis} rating={entry.healthCheckRating}/>;
        case 'OccupationalHealthcare':
            return <OccupationalHealthcareView entry={entry} diagnosis={diagnosis}/>;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;