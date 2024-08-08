export interface DiagnosisDataType {
  code: string;
  name: string;
  latin?: string;
}

export enum GenderEnum {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

interface Entry {}

export interface PatientDataType {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: GenderEnum;
  occupation: string;
  entries: Entry[];
}

export type SecurePatientDataType = Omit<PatientDataType, "ssn" | "entries">;

export type NewPatientType = Omit<PatientDataType, "id">;
