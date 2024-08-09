import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import "./index.css";

const OccupationalHealthEntryComponent = ({
  entry,
  findDiagnose,
}: {
  entry: OccupationalHealthcareEntry;
  findDiagnose: (code: Diagnosis["code"]) => JSX.Element | undefined;
}) => {
  const { date, description, specialist } = entry;

  return (
    <div className="entry-container">
      <div>
        <p>
          {date} <MedicalInformationIcon />
        </p>
        <p>{description}</p>
        <ul>{entry.diagnosisCodes?.map((code) => findDiagnose(code))}</ul>
        <p>diagnose by: {specialist}</p>
      </div>
    </div>
  );
};

export default OccupationalHealthEntryComponent;
