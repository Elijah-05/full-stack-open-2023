import { v4 as uuidv4 } from "uuid";
import patientEntries from "../../data/patients";
import {
  NewPatientType,
  PatientDataType,
  SecurePatientDataType
} from "../types";

const allPatients: PatientDataType[] = patientEntries;

const getAllPatients = (): PatientDataType[] => {
  return allPatients;
};

const getSecurePatients = (): SecurePatientDataType[] => {
  return allPatients.map((patient) => {
    const { ssn, entries, ...rest } = patient;
    return rest;
  });
};

const findPatientById = (id: string): PatientDataType | undefined => {
  const patient = getAllPatients().find((p) => p.id === id);
  return patient;
};

const addPatient = (patientEntry: NewPatientType) => {
  const newPatientEntry = {
    id: uuidv4(),
    ...patientEntry,
  };
  patientEntries.push(newPatientEntry);
  return newPatientEntry;
};

export { addPatient, findPatientById, getAllPatients, getSecurePatients };
