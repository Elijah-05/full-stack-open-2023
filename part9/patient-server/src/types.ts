export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
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

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: HealthType.OCCUPATIONAL_HEALTH_CARE;
  employerName: string;
  sickLeave: SickLeave;
}

export interface Discharge {
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

export interface PatientDataType {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type SecurePatientDataType = Omit<PatientDataType, "ssn" | "entries">;

export type NewPatientType = Omit<PatientDataType, "id">;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, "id">;
