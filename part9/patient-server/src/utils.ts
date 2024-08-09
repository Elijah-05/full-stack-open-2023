import {
  BaseEntry,
  Diagnosis,
  Discharge,
  EntryWithoutId,
  Gender,
  HealthCheckRating,
  HealthType,
  NewPatientType,
  SickLeave,
} from "./types";

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

const parseDate = (date: unknown): string => {
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

const isGenderType = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((G) => G.toString())
    .includes(gender);
};

const parseGender = (gender: unknown): Gender => {
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

const toNewPatientEntry = (object: unknown): NewPatientType => {
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
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };

    return patientEntry;
  }

  throw new Error("Incorrect data: a field missing");
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error("Invalid or missing description");
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error("Invalid or missing specialist");
  }
  return specialist;
};

// const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
//   if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
//     return [];
//   }
//   return object.diagnosisCodes as Array<Diagnosis["code"]>;
// };

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (
    typeof healthCheckRating !== "number" ||
    !Object.values(HealthCheckRating).includes(healthCheckRating)
  ) {
    throw new Error("Invalid or missing healthCheckRating");
  }

  return healthCheckRating;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (
    !discharge ||
    typeof discharge !== "object" ||
    !("date" in discharge && "criteria" in discharge)
  ) {
    throw new Error("Invalid or missing discharge");
  }
  return {
    date: parseDate(discharge.date),
    criteria: parseDescription(discharge.criteria),
  };
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (
    !sickLeave ||
    typeof sickLeave !== "object" ||
    !("startDate" in sickLeave && "endDate" in sickLeave)
  ) {
    throw new Error("Invalid or missing sickLeave");
  }

  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate),
  };
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object" || !("type" in object)) {
    throw new Error("Incorrect Entry or missing data");
  }

  if ("description" in object && "date" in object && "specialist" in object) {
    const baseEntry: Omit<BaseEntry, "id"> = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
    };

    if ("diagnosisCodes" in object) {
      baseEntry.diagnosisCodes = parseDiagnosisCodes(object);
    }

    switch (object.type) {
      case HealthType.HEALTH_CHECK:
        if ("healthCheckRating" in object) {
          return {
            ...baseEntry,
            type: HealthType.HEALTH_CHECK,
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };
        } else
          throw new Error("Missing healthCheckRating for HealthCheckEntry");
      case HealthType.HOSPITAL:
        if ("discharge" in object) {
          return {
            ...baseEntry,
            discharge: parseDischarge(object.discharge),
            type: HealthType.HOSPITAL,
          };
        } else throw new Error("Missing discharge for HospitalEntry");
        break;
      case HealthType.OCCUPATIONAL_HEALTH_CARE:
        if ("employerName" in object && "sickLeave" in object) {
          return {
            ...baseEntry,
            employerName: parseDescription(object.employerName),
            sickLeave: parseSickLeave(object.sickLeave),
            type: HealthType.OCCUPATIONAL_HEALTH_CARE,
          };
        } else
          throw new Error(
            `Missing ${!("employerName" in object) && !("sickLeave" in object) ? "employerName and sickLeave" : !("employerName" in object) ? "employerName" : !("sickLeave" in object) && "sickLeave"} for OccupationalHealthCareEntry`
          );
      default:
        throw new Error("Unkown entry type");
    }
  }

  throw new Error("Incorrect Entry: a field missing");
};

export { parseDiagnosisCodes, toNewEntry, toNewPatientEntry };
