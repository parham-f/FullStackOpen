import { FormControl, InputLabel, MenuItem, Select, TextField, Chip, OutlinedInput, Box, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { HealthCheckRating } from '../../../types';

type Props = {
  date: string;
  setDate: (v: string) => void;

  description: string;
  setDescription: (v: string) => void;

  specialist: string;
  setSpecialist: (v: string) => void;

  diagnosisCode: string[];
  setDiagnosisCode: (v: string[]) => void;

  setHealthCheckRating: (v: HealthCheckRating) => void;
};

const HealthCheckTypeForm = ({
    date, setDate,
    description, setDescription,
    specialist, setSpecialist,
    diagnosisCode, setDiagnosisCode,
    setHealthCheckRating,
}: Props) => {
    const codes = [
        "M24.2","M51.2","S03.5","J10.1","J06.9",
        "Z57.1","N30.0","H54.7","J03.0","L60.1",
        "Z74.3","L20","F43.2","S62.5","H35.29"
    ];

    const handleChange = (event: { target: { value: string; }; }) => {
        setHealthCheckRating(Number(event.target.value));
    }; 

    return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
              label="Date"
              value={date ? dayjs(date, "YYYY-MM-DD") : null}
              onChange={(newVal) => setDate(newVal ? newVal.format("YYYY-MM-DD") : "")}
              format="YYYY-MM-DD"
          />
        </DemoContainer>
      </LocalizationProvider>

      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ paddingBottom: "5px", paddingTop: "5px" }}
        fullWidth
      />

      <TextField
        label="Specialist"
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
        style={{ paddingBottom: "5px" }}
        fullWidth
      />

      <FormControl fullWidth sx={{ mt: 1 }}>
        <InputLabel id="dx-codes-label">Diagnosis Codes</InputLabel>
        <Select
          labelId="dx-codes-label"
          multiple
          value={diagnosisCode}
          label="Diagnosis Codes"
          input={<OutlinedInput label="Diagnosis Codes" />}
          onChange={(e) => {
            const val = typeof e.target.value === 'string'
              ? e.target.value.split(',')
              : (e.target.value as string[]);
            setDiagnosisCode(val);
          }}
          renderValue={(selected: string[]) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((code) => (
                <Chip key={code} label={code} />
              ))}
            </Box>
          )}
        >
          {codes.map((code) => (
            <MenuItem key={code} value={code}>
              {code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
        <FormControl>
        <FormLabel >Health Check Rating</FormLabel>
            <RadioGroup
                row
                onChange={handleChange}
            >
                <FormControlLabel value={HealthCheckRating.Healthy} label="0" control={<Radio />}/>
                <FormControlLabel value={HealthCheckRating.LowRisk} label="1" control={<Radio />}/>
                <FormControlLabel value={HealthCheckRating.HighRisk} label="2" control={<Radio />}/>
                <FormControlLabel value={HealthCheckRating.CriticalRisk} label="3" control={<Radio />}/>
            </RadioGroup>
        </FormControl>
    </div>
  );
};

export default HealthCheckTypeForm;