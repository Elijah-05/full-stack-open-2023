import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Diagnosis, Entry, EntryWithoutId, PatientDetail } from "../../types";
import HospitalEntryComponent from "./HospitalEntryComponent";
import HealthCheckEntryComponent from "./HealthCheckEntryComponent";
import OccupationalHealthEntryComponent from "./OccupationalHealthEntryComponent";
import { Alert, Button } from "@mui/material";
import NewEntryForm from "./NewEntryForm";
import { AxiosError } from "axios";

interface ChildRef {
  clearAllInputs: () => void;
}

const PatientDetailPage = () => {
  const [patientInfo, setPatientInfo] = useState<PatientDetail | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isEntryCreated, setIsEntryCreated] = useState<boolean>(false);
  const params = useParams();
  const patientId = params.id;
  const diagnosesCodeList: Array<Diagnosis["code"]> = diagnoses.map(
    (d) => d.code
  );
  const newEntryFormRef = useRef<ChildRef>(null);
  let timeout: number;

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

  const handleAddNewEntry = (entry: EntryWithoutId): void => {
    if (patientInfo) {
      patientService
        .addNewEntry(patientInfo.id, entry)
        .then((res) => {
          setPatientInfo({
            ...patientInfo,
            entries: patientInfo.entries.concat(res),
          });
          if (newEntryFormRef.current) {
            newEntryFormRef.current.clearAllInputs();
          }
          setIsEntryCreated(true);
          setTimeout(() => {
            setIsEntryCreated(false);
          }, 1000 * 3);
        })
        .catch((err: AxiosError) => {
          handleError(err.response?.data as string);
        });
    } else handleError("Patient ID Not Found");
  };

  const handleError = (message: string): void => {
    // clearTimeout(timeout);
    if (!message) {
      setError("");
    } else {
      clearTimeout(timeout);
      setError(message);
      timeout = setTimeout(() => {
        setError("");
      }, 1000 * 3);
    }
  };

  return patientInfo ? (
    <div style={{ marginTop: "25px" }}>
      <h2>
        {patientInfo.name} {getGenderIcon()}
      </h2>
      <p>ssn: {patientInfo.ssn}</p>
      <p>occupation: {patientInfo.occupation}</p>
      {error && <Alert severity="error">{error}</Alert>}
      {isEntryCreated && (
        <Alert severity="success">Entry Successfully Created</Alert>
      )}
      {showForm && (
        <NewEntryForm
          ref={newEntryFormRef}
          setShowForm={setShowForm}
          handleAddNewEntry={handleAddNewEntry}
          handleError={handleError}
          diagnosesCodeList={diagnosesCodeList}
        />
      )}
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
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: "15px" }}
        onClick={() => setShowForm(true)}
      >
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
