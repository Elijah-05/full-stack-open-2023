export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export enum HealthType {
  HEALTH_CHECK = "HealthCheck",
  OCCUPATIONAL_HEALTH_CARE = "OccupationalHealthcare",
  HOSPITAL = "Hospital",
}

export interface HealthCheckEntry extends BaseEntry {
  type: HealthType.HEALTH_CHECK;
  healthCheckRating: HealthCheckRating;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: HealthType.OCCUPATIONAL_HEALTH_CARE;
  employerName: string;
  sickLeave: SickLeave;
}

interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: HealthType.HOSPITAL;
  discharge: Discharge;
}

export type Entry =
  | HealthCheckEntry
  | OccupationalHealthcareEntry
  | HospitalEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
}

export interface PatientDetail extends Patient {
  ssn: string;
  entries: Entry[];
}

export type PatientList = Omit<Patient, "ssn" | "entries">;

export type PatientFormValues = Omit<PatientDetail, "id" | "entries">;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, "id">;
