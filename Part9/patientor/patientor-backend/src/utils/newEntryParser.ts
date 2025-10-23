import { z } from "zod";
import { HealthCheckRating } from "../types";

const isDate = (s: string) => !Number.isNaN(Date.parse(s));

const BaseEntry = z.object({
  description: z.string(),
  date: z.string().refine(isDate, "Invalid date"),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckEntry = BaseEntry.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const HospitalEntry = BaseEntry.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string().refine(isDate, "Invalid date"),
    criteria: z.string(),
  }),
});

const OccupationalHealthcareEntry = BaseEntry.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string().refine(isDate, "Invalid date"),
      endDate: z.string().refine(isDate, "Invalid date"),
    })
    .optional(),
});

export const NewEntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
]);

export type EntryWithoutId = z.infer<typeof NewEntrySchema>;
