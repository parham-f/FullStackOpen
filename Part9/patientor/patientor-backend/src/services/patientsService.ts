import patientsData from '../../data/patients';
import { PatientsEntry, NewPatientEntry, NonSensitivePatient } from '../types';
import { v1 as uuid } from 'uuid';

const patients: PatientsEntry[] = patientsData;

const getEntries = (): PatientsEntry[] => {
    return patients;
};

const getEntryById = (patientId: string): PatientsEntry | undefined => {
    return patients.find(p => p.id === patientId);
};

const getNoSsnPatientsEntries = (): NonSensitivePatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (entry: NewPatientEntry): NonSensitivePatient => {
    const newPatientEntry = {
        id: uuid(),
        entries: [],
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {getEntries, getNoSsnPatientsEntries, addPatient, getEntryById};