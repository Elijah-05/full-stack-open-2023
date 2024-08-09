export interface DiagnosisDataType {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnosisDataType["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave: SickLeave;
}

interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
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
