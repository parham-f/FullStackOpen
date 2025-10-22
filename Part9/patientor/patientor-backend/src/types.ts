import {z} from "zod";
import { NewEntrySchema } from "./utils";

export interface Entry {
}

export interface DiagnoseEntry {
    code: string,
    name: string,
    latin?: string
};

export type NewPatientEntry = z.infer<typeof NewEntrySchema>;

export interface PatientsEntry extends NewPatientEntry {
    id: string;
    entries: Entry[];
};

export type NonSensitivePatient = Omit<PatientsEntry, 'ssn' | 'entries'>;

export enum Gender {
    Other = 'other',
    Male = 'male',
    Female = 'female'
};