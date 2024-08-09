import { v4 as uuidv4 } from "uuid";
import express from "express";
import {
  addPatient,
  findPatientById,
  getSecurePatients,
} from "../services/patientService";
import { toNewEntry, toNewPatientEntry } from "../utils";
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

router.post("/:id/entries", (req, res) => {
  const { id } = req.params;
  try {
    const patient = findPatientById(id);
    if (!patient) {
      return res.status(404).send({ error: "Patient not found" });
    }

    const newEntry = toNewEntry(req.body);
    patient.entries.push({
      ...newEntry,
      id: uuidv4(),
    });
    console.log("PATIENT INFO: ", newEntry);
    return res.json(newEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
    }
    return res.status(400).send(errorMessage);
  }
});

export default router;
