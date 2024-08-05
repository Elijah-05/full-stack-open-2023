import express, { Request, Response } from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnosesRouter";
import patientRouter from "./routes/patientRouter";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get("/api/ping", (_req: Request, res: Response): void => {
  console.log("something pinged here");
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
