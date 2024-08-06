import { GenderEnum, NewPatientType } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name) || !name) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

const isValidDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isValidDate(date)) {
    throw new Error("Invalid date: " + date);
  }

  return date;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

const isGenderType = (gender: string): gender is GenderEnum => {
  return Object.values(GenderEnum)
    .map((G) => G.toString())
    .includes(gender);
};

const parseGender = (gender: unknown): GenderEnum => {
  if (!gender || !isString(gender) || !isGenderType(gender)) {
    throw new Error("Invalid or missing gender");
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Invalid or missing occupation");
  }

  return occupation;
};

export const toNewPatientEntry = (object: unknown): NewPatientType => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  const hasRequiredPropteries =
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object;
  if (hasRequiredPropteries) {
    const patientEntry: NewPatientType = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };

    return patientEntry;
  }

  throw new Error("Incorrect data: a field missing");
};
