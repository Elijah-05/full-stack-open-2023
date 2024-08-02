import express from "express";
import cors from "cors";
import apiRoutes from "./routes/apiRoutes";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});