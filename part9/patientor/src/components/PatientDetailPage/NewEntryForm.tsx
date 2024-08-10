import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import {
  forwardRef,
  SyntheticEvent,
  useImperativeHandle,
  useState,
} from "react";
import {
  BaseEntry,
  Diagnosis,
  EntryWithoutId,
  HealthCheckEntry,
  HealthCheckRating,
  HealthType,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";

const initialBaseEntry = {
  description: "",
  date: "",
  specialist: "",
};

interface NewEntryFormProp {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddNewEntry: (formatedEntry: EntryWithoutId) => void;
  handleError: (message: string) => void;
  diagnosesCodeList: Array<Diagnosis["code"]>;
}

const NewEntryForm = forwardRef(
  (
    {
      setShowForm,
      handleError,
      diagnosesCodeList,
      handleAddNewEntry,
    }: NewEntryFormProp,
    ref
  ) => {
    const [baseEntry, setBaseEntry] =
      useState<Omit<BaseEntry, "id">>(initialBaseEntry);
    const [type, setType] = useState<HealthType>(HealthType.HEALTH_CHECK);
    const [healthCheckRatingEntry, setHealthCheckRatingEntry] =
      useState<HealthCheckRating>(1);
    const [selectedDiagnosesCodes, setSelectedDiagnosesCodes] = useState<
      Array<Diagnosis["code"]>
    >([]);
    const [occupationalEntry, setOccupationalEntry] = useState<
      Pick<OccupationalHealthcareEntry, "type" | "employerName" | "sickLeave">
    >({
      type: HealthType.OCCUPATIONAL_HEALTH_CARE,
      employerName: "",
      sickLeave: {
        startDate: "",
        endDate: "",
      },
    });
    const [hospitalEntry, setHostpitalEntry] = useState<
      Pick<HospitalEntry, "type" | "discharge">
    >({
      type: HealthType.HOSPITAL,
      discharge: {
        date: "",
        criteria: "",
      },
    });

    const handleSubmit = (e: SyntheticEvent) => {
      e.preventDefault();
      if (!baseEntry.date || !baseEntry.description || !baseEntry.specialist) {
        handleError("All fields are required");
      } else {
        let specificEntry:
          | Pick<
              OccupationalHealthcareEntry,
              "type" | "employerName" | "sickLeave"
            >
          | Pick<HospitalEntry, "type" | "discharge">
          | Pick<HealthCheckEntry, "type" | "healthCheckRating">;

        switch (type) {
          case HealthType.HEALTH_CHECK:
            specificEntry = {
              type: HealthType.HEALTH_CHECK,
              healthCheckRating: healthCheckRatingEntry,
            };
            break;
          case HealthType.HOSPITAL:
            specificEntry = hospitalEntry;
            break;
          case HealthType.OCCUPATIONAL_HEALTH_CARE:
            specificEntry = occupationalEntry;
            break;
          default:
            throw new Error("Invalid Input");
        }

        const finalEntries: EntryWithoutId = { ...baseEntry, ...specificEntry };
        if (selectedDiagnosesCodes.length > 0) {
          finalEntries.diagnosisCodes = selectedDiagnosesCodes;
        }
        handleAddNewEntry(finalEntries);
      }
    };

    useImperativeHandle(ref, () => ({
      clearAllInputs: () => {
        setBaseEntry(initialBaseEntry);
        setHealthCheckRatingEntry(1);
        setSelectedDiagnosesCodes([]);
        setOccupationalEntry({
          type: HealthType.OCCUPATIONAL_HEALTH_CARE,
          employerName: "",
          sickLeave: {
            startDate: "",
            endDate: "",
          },
        });
        setHostpitalEntry({
          type: HealthType.HOSPITAL,
          discharge: {
            date: "",
            criteria: "",
          },
        });
      },
    }));

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };

    const handleChange = (
      event: SelectChangeEvent<typeof selectedDiagnosesCodes>
    ) => {
      const {
        target: { value },
      } = event;
      setSelectedDiagnosesCodes(
        Array.isArray(value) ? value : selectedDiagnosesCodes.concat(value)
      );
    };

    const renderHealthbaseEntry = () => {
      switch (type) {
        case HealthType.HEALTH_CHECK:
          return (
            <FormControl fullWidth>
              <InputLabel id="health-check-rating">
                Healthcheck rating
              </InputLabel>
              <Select
                labelId="health-check-rating"
                id="health-check-rating-selection"
                value={healthCheckRatingEntry}
                label="Healthcheck rating"
                onChange={({ target }) =>
                  setHealthCheckRatingEntry(Number(target.value))
                }
              >
                <MenuItem value={0}>{0}</MenuItem>
                <MenuItem value={1}>{1}</MenuItem>
                <MenuItem value={2}>{2}</MenuItem>
                <MenuItem value={3}>{3}</MenuItem>
              </Select>
            </FormControl>
          );
        case HealthType.HOSPITAL:
          return (
            <>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                label="Discharge Date"
                type="date"
                fullWidth
                value={hospitalEntry.discharge.date}
                onChange={({ target }) =>
                  setHostpitalEntry({
                    ...hospitalEntry,
                    discharge: {
                      ...hospitalEntry.discharge,
                      date: target.value,
                    },
                  })
                }
              />
              <TextField
                label="Discharge Criteria"
                fullWidth
                value={hospitalEntry.discharge.criteria}
                onChange={({ target }) =>
                  setHostpitalEntry({
                    ...hospitalEntry,
                    discharge: {
                      ...hospitalEntry.discharge,
                      criteria: target.value,
                    },
                  })
                }
              />
            </>
          );
        case HealthType.OCCUPATIONAL_HEALTH_CARE:
          return (
            <>
              <TextField
                label="Employer Name"
                fullWidth
                value={occupationalEntry.employerName}
                onChange={({ target }) =>
                  setOccupationalEntry({
                    ...occupationalEntry,
                    employerName: target.value,
                  })
                }
              />
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                label="SickLeave Start Date"
                type="date"
                fullWidth
                value={occupationalEntry.sickLeave.startDate}
                onChange={({ target }) =>
                  setOccupationalEntry({
                    ...occupationalEntry,
                    sickLeave: {
                      ...occupationalEntry.sickLeave,
                      startDate: target.value,
                    },
                  })
                }
              />
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                label="SickLeave End Date"
                type="date"
                fullWidth
                value={occupationalEntry.sickLeave.endDate}
                onChange={({ target }) =>
                  setOccupationalEntry({
                    ...occupationalEntry,
                    sickLeave: {
                      ...occupationalEntry.sickLeave,
                      endDate: target.value,
                    },
                  })
                }
              />
            </>
          );
        default:
          break;
      }
    };

    return (
      <div>
        <h3>New Health entry</h3>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          <TextField
            label="Description"
            fullWidth
            value={baseEntry.description}
            onChange={({ target }) =>
              setBaseEntry({ ...baseEntry, description: target.value })
            }
          />
          <TextField
            label="Date"
            InputLabelProps={{
              shrink: true, // This will ensure the label is always above the input
            }}
            type="date"
            fullWidth
            value={baseEntry.date}
            onChange={({ target }) =>
              setBaseEntry({ ...baseEntry, date: target.value })
            }
          />
          <TextField
            label="Specialist"
            placeholder="specialist name"
            fullWidth
            value={baseEntry.specialist}
            onChange={({ target }) =>
              setBaseEntry({ ...baseEntry, specialist: target.value })
            }
          />
          <InputLabel id="type-id" sx={{ fontSize: "0.8rem" }}>
            Organization Type
          </InputLabel>
          <Select
            fullWidth
            id="type-selector"
            value={type}
            onChange={(event) => setType(event.target.value as HealthType)}
            sx={{ marginTop: "-10px", marginBottom: "8px" }}
          >
            <MenuItem value={HealthType.HEALTH_CHECK}>
              {HealthType.HEALTH_CHECK}
            </MenuItem>
            <MenuItem value={HealthType.HOSPITAL}>
              {HealthType.HOSPITAL}
            </MenuItem>
            <MenuItem value={HealthType.OCCUPATIONAL_HEALTH_CARE}>
              {HealthType.OCCUPATIONAL_HEALTH_CARE}
            </MenuItem>
          </Select>
          {/* Dynamic Input for specific Entry Type */}
          {renderHealthbaseEntry()}
          <FormControl fullWidth sx={{}}>
            <InputLabel id="demo-multiple-checkbox-label">
              Diagnoses Codes
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={selectedDiagnosesCodes}
              onChange={handleChange}
              input={<OutlinedInput label="Diagnoses Code" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {diagnosesCodeList.map((code) => (
                <MenuItem key={code} value={code}>
                  <Checkbox checked={selectedDiagnosesCodes.includes(code)} />
                  <ListItemText primary={code} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Grid>
            <Grid item>
              <Button
                color="error"
                variant="contained"
                style={{ float: "left" }}
                type="button"
                onClick={() => {
                  handleError("");
                  setShowForm(false);
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{
                  float: "right",
                }}
                color="success"
                type="submit"
                variant="contained"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
);

export default NewEntryForm;
