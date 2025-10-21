import patientsData from '../../data/patients';
import { PatientsEntry, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

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

const addPatient = (entry: NewPatientEntry): PatientsEntry => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {getEntries, getNoSsnPatientsEntries, addPatient};