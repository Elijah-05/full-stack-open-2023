import { Request, Response } from "express";
import { getSecurePatients } from "../services/patientService";

const patient = (_req: Request, res: Response) => {
  res.send(getSecurePatients());
};

export default patient;
