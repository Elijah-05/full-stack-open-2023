import express from "express";
import { addPatient, getSecurePatients } from "../services/patientService";
import { toNewPatientEntry } from "../utils";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getSecurePatients());
});

router.post("/", (req, res) => {
  console.log({ req });
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    console.log("newPatientEntry from Utils: ", newPatientEntry);
    const { ssn, ...addedPatient } = addPatient(newPatientEntry);
    console.log("addedPatient from Service: ", addedPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += ` Error: ` + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
