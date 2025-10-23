import {z} from "zod";
import { NewPatientSchema } from "./utils/utils";

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface Discharge {
    date: string;
    criteria: string;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export interface DiagnoseEntry {
    code: string,
    name: string,
    latin?: string
};

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

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