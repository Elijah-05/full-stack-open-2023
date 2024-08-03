export interface DiagnosisDataType {
  code: string;
  name: string;
  latin?: string;
}

type GenderTypes = "male" | "female" | "other";

export interface PatientDataType {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: GenderTypes;
  occupation: string;
}

export type SecurePatientDataType = Omit<PatientDataType, "ssn">;
