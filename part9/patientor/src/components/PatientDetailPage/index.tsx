import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Patient } from "../../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

const PatientDetailPage = () => {
  const [patientInfo, setPatientInfo] = useState<Patient | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const params = useParams();
  const patientId = params.id;

  useEffect(() => {
    if (patientId) {
      setIsFetching(true);
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

  return patientInfo ? (
    <div style={{ marginTop: "25px" }}>
      <h2>
        {patientInfo.name} {getGenderIcon()}
      </h2>
      <p>ssn: {patientInfo.ssn}</p>
      <p>occupation: {patientInfo.occupation}</p>
    </div>
  ) : (
    <div>
      <h2>No patient please go back!</h2>
    </div>
  );
};

export default PatientDetailPage;
