import { Router } from "express";
import ping from "../controllers/pingController";
import diagnosis from "../controllers/diagnosesController";
import patient from "../controllers/patientController";

const router = Router();

router.get("/ping", ping);
router.get("/diagnoses", diagnosis);
router.get("/patients", patient);

export default router;
