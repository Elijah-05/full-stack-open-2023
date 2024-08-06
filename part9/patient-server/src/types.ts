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

export interface PatientDataType {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: GenderEnum;
  occupation: string;
}

export type SecurePatientDataType = Omit<PatientDataType, "ssn">;

export type NewPatientType = Omit<PatientDataType, "id">;
