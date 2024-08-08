import express from "express";
import { addPatient, getSecurePatients } from "../services/patientService";
import { findPatientById, toNewPatientEntry } from "../utils";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getSecurePatients());
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  try {
    const patient = findPatientById(id);
    res.json(patient);
  } catch (error) {
    res.status(400).send({ error: "Patient not found" });
  }
});

router.post("/", (req, res) => {
  console.log({ req });
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const { ssn, ...addedPatient } = addPatient(newPatientEntry);
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
