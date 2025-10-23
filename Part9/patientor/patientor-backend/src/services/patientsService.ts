import patientsData from '../../data/patients';
import { PatientsEntry, NewPatientEntry, NonSensitivePatient, Entry, EntryWithoutId } from '../types';
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

const getPatientById = (id: string) => patients.find(p => p.id === id);

const addEntry = (entry: EntryWithoutId, patientId: string): Entry => {
  const patient = getPatientById(patientId);
  if (!patient) throw new Error("Patient not found");

  const newEntry: Entry = { id: uuid(), ...entry };
  if (!patient.entries) patient.entries = [];
  patient.entries.push(newEntry);
  return newEntry;
};

export default {getEntries, getNoSsnPatientsEntries, addPatient, getEntryById, addEntry, getPatientById};