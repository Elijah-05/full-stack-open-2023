import data from "../../data/diagnoses";
import { Diagnosis } from "../types";

const diagnosisData: Diagnosis[] = data;

const getAllDiagnoses = (): Diagnosis[] => {
  return diagnosisData;
};

export { getAllDiagnoses };
