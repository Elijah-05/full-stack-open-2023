import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Diagnosis, Entry, PatientDetail } from "../../types";
import HospitalEntryComponent from "./HospitalEntryComponent";
import HealthCheckEntryComponent from "./HealthCheckEntryComponent";
import OccupationalHealthEntryComponent from "./OccupationalHealthEntryComponent";
import { Button } from "@mui/material";
import NewEntryForm from "./NewEntryForm";

const PatientDetailPage = () => {
  const [patientInfo, setPatientInfo] = useState<PatientDetail | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const params = useParams();
  const patientId = params.id;

  useEffect(() => {
    if (patientId) {
      setIsFetching(true);
      patientService.getDiagnoses().then((d) => setDiagnoses(d));
      patientService
        .getPatient(patientId)
        .then((res) => setPatientInfo(res))
        .catch((err) => console.log("Unable to fetch patient! Error: ", err))
        .finally(() => setIsFetching(false));
    }
  }, [patientId]);

  if (isFetching) <h4>Loading Patient Data...</h4>;
  const getGenderIcon = () => {
    switch (patientInfo?.gender) {
      case "male":
        return <MaleIcon />;
      case "female":
        return <FemaleIcon />;
      default:
        break;
    }
  };

  function findDiagnose(code: Diagnosis["code"]) {
    const diagnose = diagnoses.find((d) => d.code === code);
    if (diagnose) {
      return (
        <li key={code}>
          {diagnose.code}: {diagnose.name}
        </li>
      );
    } else <li>{code}</li>;
  }

  return patientInfo ? (
    <div style={{ marginTop: "25px" }}>
      <h2>
        {patientInfo.name} {getGenderIcon()}
      </h2>
      <p>ssn: {patientInfo.ssn}</p>
      <p>occupation: {patientInfo.occupation}</p>
      <NewEntryForm />
      <div style={{ marginTop: "14px" }}>
        <h3>Entries</h3>
        {patientInfo.entries.map((entry: Entry) => {
          switch (entry.type) {
            case "Hospital":
              return (
                <HospitalEntryComponent
                  key={entry.id}
                  entry={entry}
                  findDiagnose={findDiagnose}
                />
              );
            case "OccupationalHealthcare":
              return (
                <OccupationalHealthEntryComponent
                  key={entry.id}
                  entry={entry}
                  findDiagnose={findDiagnose}
                />
              );
            case "HealthCheck":
              return (
                <HealthCheckEntryComponent
                  key={entry.id}
                  entry={entry}
                  findDiagnose={findDiagnose}
                />
              );
            default:
              break;
          }
        })}
      </div>
      <Button variant="contained" color="primary" sx={{ marginTop: "15px" }}>
        ADD NEW ENTRY
      </Button>
    </div>
  ) : (
    <div>
      <h2>No patient please go back!</h2>
    </div>
  );
};

export default PatientDetailPage;
