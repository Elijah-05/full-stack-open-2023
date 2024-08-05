import data from "../data/patients";
import { PatientDataType, SecurePatientDataType } from "../types/types";

const allPatients: PatientDataType[] = data as PatientDataType[];

const getAllPatients = (): PatientDataType[] => {
  return allPatients;
};

const getSecurePatients = (): SecurePatientDataType[] => {
  return allPatients.map((patient) => {
    const { ssn, ...rest } = patient;
    return rest;
  });
};



export { getAllPatients, getSecurePatients };