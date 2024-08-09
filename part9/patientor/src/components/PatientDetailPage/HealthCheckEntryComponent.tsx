import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Diagnosis, HealthCheckEntry } from "../../types";
import "./index.css";

const HealthCheckEntryComponent = ({
  entry,
  findDiagnose,
}: {
  entry: HealthCheckEntry;
  findDiagnose: (code: Diagnosis["code"]) => JSX.Element | undefined;
}) => {
  const { id, date, description, specialist, healthCheckRating } = entry;

  const starIconColor = (): string => {
    switch (healthCheckRating) {
      case 0:
        return "green";
      case 1:
        return "yellow";
      case 2:
        return "orange";
      case 3:
        return "red";
      default:
        return "black";
    }
  };

  return (
    <div className="entry-container">
      <div key={id}>
        <p>
          {date} <MedicationLiquidIcon />
        </p>
        <p>{description}</p>
        <ul>{entry.diagnosisCodes?.map((code) => findDiagnose(code))}</ul>
        <div>
          <StarBorderIcon sx={{ color: starIconColor() }} />
        </div>
        <p>diagnose by: {specialist}</p>
      </div>
    </div>
  );
};

export default HealthCheckEntryComponent;
