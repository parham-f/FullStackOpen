import patientsData from '../../data/patients';
import { PatientsEntry } from '../types';

const patients: PatientsEntry[] = patientsData;

const getEntries = (): PatientsEntry[] => {
    return patients;
};

const getNoSsnPatientsEntries = (): PatientsEntry[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {getEntries, getNoSsnPatientsEntries};