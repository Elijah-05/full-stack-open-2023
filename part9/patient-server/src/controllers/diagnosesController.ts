import { Request, Response } from "express";
import { getAllDiagnoses } from "../services/diagnosisService";

const diagnosis = (_req: Request, res: Response): void => {
  res.send(getAllDiagnoses());
};

export default diagnosis;
