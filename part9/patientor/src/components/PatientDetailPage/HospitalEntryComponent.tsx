import { Diagnosis, HospitalEntry } from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import "./index.css";

const HospitalEntryComponent = ({
  entry,
  findDiagnose,
}: {
  entry: HospitalEntry;
  findDiagnose: (code: Diagnosis["code"]) => JSX.Element | undefined;
}) => {
  const { id, date, description, specialist } = entry;

  return (
    <div className="entry-container">
      <div key={id}>
        <p>
          {date} <LocalHospitalIcon />
        </p>
        <p>{description}</p>
        <ul>{entry.diagnosisCodes?.map((code) => findDiagnose(code))}</ul>
        <p>diagnose by: {specialist}</p>
      </div>
    </div>
  );
};

export default HospitalEntryComponent;
