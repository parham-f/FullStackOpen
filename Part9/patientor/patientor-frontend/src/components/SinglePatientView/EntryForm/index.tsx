import { SetStateAction, useState } from "react";
import { Alert, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import HospitalTypeForm from "./HospitalTypeForm";
import HealthCheckTypeForm from "./HealthCheckTypeForm";
import OccupationalHealthcareTypeForm from "./OccupationalHealthcareTypeForm";
import { Entry, EntryWithoutId, HealthCheckRating } from "../../../types";
import patientService from "../../../services/patients";
import axios from "axios";

type EntryFormProps = {
  patientId: string;
  onAdded?: (entry: Entry) => void;
};

const EntryForm = ({ patientId, onAdded }: EntryFormProps) => {
    const [addForm, setAddForm] = useState<boolean>(false);
    const [type, setType] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [specialist, setSpecialist] = useState<string>("");
    const [diagnosisCode, setDiagnosisCode] = useState<string[]>([]);
    const [dischargeDate, setDischargeDate] = useState<string>("");
    const [criteria, setCriteria] = useState<string>("");
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);
    const [employerName, setEmployerName] = useState<string>("");
    const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>("");
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<string[] | null>(null);

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setType(event.target.value);
    };

    const extractApiErrors = (e: unknown): string[] => {
        if (axios.isAxiosError(e)) {
            const data = e.response?.data;
            const err = (data as any)?.error;
            if (Array.isArray(err)) {
                return err.map((iss: any) => {
                    const path = Array.isArray(iss.path) ? iss.path.join(".") : "";
                    return path ? `${path}: ${iss.message}` : `${iss.message}`;
                });
            }
            if (typeof err === "string") return [err];
            if (typeof data === "string") return [data];
            return [e.message || "Request failed"];
        }
        return [e instanceof Error ? e.message : "Failed to create entry"];
    };

    const resetForm = () => {
        setAddForm(false);
        setType('');
        setDate('');
        setDescription('');
        setSpecialist('');
        setDiagnosisCode([]);
        setDischargeDate("");
        setCriteria("");
        setHealthCheckRating(0);
        setEmployerName("");
        setSickLeaveStartDate("");
        setSickLeaveEndDate("");
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            setError(null);
            if (!patientId) throw new Error("Missing patient id in route");

            if (type === "Hospital") {
                const payload: EntryWithoutId = {
                    type: "Hospital",
                    date,
                    description,
                    specialist,
                    diagnosisCodes: diagnosisCode,
                    discharge: {
                        date: dischargeDate,
                        criteria,
                    },
                };

                const created = await patientService.addEntry(patientId, payload);
                onAdded?.(created);
                resetForm();
                return;
            }

            if (type === "HealthCheck") {
                const payload: EntryWithoutId = {
                    type: "HealthCheck",
                    date,
                    description,
                    specialist,
                    diagnosisCodes: diagnosisCode,
                    healthCheckRating
                };

                const created = await patientService.addEntry(patientId, payload);
                onAdded?.(created);
                resetForm();
                return;
            }

            if (type === "OccupationalHealthcare") {
                const payload: EntryWithoutId = {
                    type: "OccupationalHealthcare",
                    date,
                    description,
                    specialist,
                    diagnosisCodes: diagnosisCode,
                    employerName,
                    sickLeave: {
                        startDate: sickLeaveStartDate,
                        endDate: sickLeaveEndDate
                    }
                };

                const created = await patientService.addEntry(patientId, payload);
                onAdded?.(created);
                resetForm();
                return;
            }

            throw new Error("Please select an entry type and fill the required fields.");
        } catch (e) {
            setErrors(extractApiErrors(e));
            setTimeout(() => setErrors(null), 5000);
        }
    };
    
    return (
        <div>
            {!addForm && (
                    <Button variant="contained" onClick={() => setAddForm(true)}>
                        Add New Entry
                    </Button>
                )}
                {addForm && (
                    <div style={{border: "2px dashed", padding: "20px"}}>
                        {errors && (
                            <Alert severity="error">
                                <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
                                {errors.map((m, i) => <li key={i}>{m}</li>)}
                                </ul>
                            </Alert>
                        )}
                        <form style={{paddingBottom: "5px"}} onSubmit={handleSubmit}>
                            <FormControl fullWidth style={{paddingBottom: "5px"}}>
                                <InputLabel >Type</InputLabel>
                                <Select
                                    value={type}
                                    label="Type"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"HealthCheck"}>HealthCheck</MenuItem>
                                    <MenuItem value={"Hospital"}>Hospital</MenuItem>
                                    <MenuItem value={"OccupationalHealthcare"}>OccupationalHealthCare</MenuItem>
                                </Select>
                            </FormControl>
                            {type === "Hospital" && (
                                <HospitalTypeForm
                                    date={date}
                                    setDate={setDate}
                                    description={description}
                                    setDescription={setDescription}
                                    specialist={specialist}
                                    setSpecialist={setSpecialist}
                                    diagnosisCode={diagnosisCode}
                                    setDiagnosisCode={setDiagnosisCode}
                                    dischargeDate={dischargeDate}
                                    setDischargeDate={setDischargeDate}
                                    criteria={criteria}
                                    setCriteria={setCriteria}
                                />
                            )}
                            {type === "HealthCheck" && (
                                <HealthCheckTypeForm
                                    date={date}
                                    setDate={setDate}
                                    description={description}
                                    setDescription={setDescription}
                                    specialist={specialist}
                                    setSpecialist={setSpecialist}
                                    diagnosisCode={diagnosisCode}
                                    setDiagnosisCode={setDiagnosisCode}
                                    setHealthCheckRating={setHealthCheckRating}
                                />
                            )}
                            {type == "OccupationalHealthcare" && (
                                <OccupationalHealthcareTypeForm
                                    date={date}
                                    setDate={setDate}
                                    description={description}
                                    setDescription={setDescription}
                                    specialist={specialist}
                                    setSpecialist={setSpecialist}
                                    diagnosisCode={diagnosisCode}
                                    setDiagnosisCode={setDiagnosisCode}
                                    employerName={employerName}
                                    setEmployerName={setEmployerName}
                                    sickLeaveStartDate={sickLeaveStartDate}
                                    setSickLeaveStartDate={setSickLeaveStartDate}
                                    sickLeaveEndDate={sickLeaveEndDate}
                                    setSickLeaveEndDate={setSickLeaveEndDate}
                                />
                            )}
                            <Button variant="contained" type="submit">
                                ADD
                            </Button>
                        </form>
                        <Button color="secondary" variant="contained" onClick={resetForm}>
                            CANCEL
                        </Button>
                    </div>
                )}
            </div>
    )

};

export default EntryForm;