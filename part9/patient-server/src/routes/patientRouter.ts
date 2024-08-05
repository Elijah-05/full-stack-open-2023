import express from "express";
import { getAllPatients } from "../services/patientService";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getAllPatients());
});

router.post("/", (req, res) => {
  console.log({ req });
  res.end();
  //
});

export default router;
