import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";
import { Diagnosis } from "./types";

import patientService from "./services/patients";
import diagnosisService from "./services/diagnosis"
import PatientListPage from "./components/PatientListPage";
import SinglePatientView from "./components/SinglePatientView/SinglePatientView";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([])

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };

    async () => {
      const diagnosis = await diagnosisService.getAll();
      setDiagnosis(diagnosis);
    };

    void fetchPatientList();
  }, []);

  useEffect(() => {

    const fetchedDiagnosis = async () => {
      const diagnosis = await diagnosisService.getAll();
      setDiagnosis(diagnosis);
    };

    void fetchedDiagnosis();
  }, []);

  const patientMatch = useMatch("/patients/:id");
  const singlePatient: Patient | null | undefined = patientMatch
    ? patients.find((p) => String(p.id) === patientMatch.params.id)
    : null;
  
  return (
    <div className="App">
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<SinglePatientView patient={singlePatient} diagnosis={diagnosis}/>}/>
          </Routes>
        </Container>
    </div>
  );
};

export default App;
