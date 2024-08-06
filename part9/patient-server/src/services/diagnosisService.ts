import data from "../../data/diagnoses";
import { DiagnosisDataType } from "../types";

const diagnosisData: DiagnosisDataType[] = data;

const getAllDiagnoses = (): DiagnosisDataType[] => {
  return diagnosisData;
};

export { getAllDiagnoses };
