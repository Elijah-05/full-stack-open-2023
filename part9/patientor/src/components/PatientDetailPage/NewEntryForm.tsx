import {
  Box,
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
import { SyntheticEvent, useState } from "react";
import { BaseEntry, Diagnosis, EntryWithoutId, HealthType } from "../../types";

const initialFormValues = {
  type: HealthType.HEALTH_CHECK,
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

const NewEntryForm = ({
  setShowForm,
  handleAddNewEntry,
  handleError,
  diagnosesCodeList,
}: NewEntryFormProp) => {
  const [baseEntry, setBaseEntry] =
    useState<Omit<BaseEntry, "id">>(initialFormValues);
  const [type, setType] = useState<HealthType>(HealthType.HEALTH_CHECK);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!baseEntry.date || !baseEntry.description || !baseEntry.specialist) {
      handleError("All fields are required");
    } else {
      const formatedBaseEntry = {
        date: baseEntry.date,
        description: baseEntry.description,
        specialist: baseEntry.specialist,
        type: HealthType.HEALTH_CHECK,
      };

      switch (type) {
        case HealthType.HEALTH_CHECK:
          const healthCheckEntry = {
            ...formatedBaseEntry,
            type: HealthType.HEALTH_CHECK,
          };
          break;
        case HealthType.HOSPITAL:
          break;
        case HealthType.OCCUPATIONAL_HEALTH_CARE:
          break;
        default:
          break;
      }
      // baseEntry?.diagnosisCodes?.filter(
      //   (code) => Boolean(code) === true
      // ),

      // handleAddNewEntry(formatedBaseEntry);
      setBaseEntry(initialFormValues);
    }
  };

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
    event: SelectChangeEvent<typeof baseEntry.diagnosisCodes>
  ) => {
    const {
      target: { value },
    } = event;
    setBaseEntry(
      // On autofill we get a stringified value.
      {
        ...baseEntry,
        diagnosisCodes: typeof value === "string" ? value.split(",") : value,
      }
    );
  };

  const renderHealthbaseEntry = () => {
    switch (type) {
      case HealthType.HEALTH_CHECK:
        return (
          <FormControl fullWidth>
            <InputLabel id="health-check-rating">Healthcheck rating</InputLabel>
            <Select
              labelId="health-check-rating"
              id="health-check-rating-selection"
              value={baseEntry.healthCheckRating}
              label="Healthcheck rating"
              onChange={({ target }) =>
                setBaseEntry({
                  ...baseEntry,
                  healthCheckRating: Number(target.value),
                })
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
        return <div>Hospital Type</div>;
      case HealthType.OCCUPATIONAL_HEALTH_CARE:
        return <div>Occupational Health Care Inputs</div>;
      default:
        break;
    }
  };

  return (
    <div>
      <h3>New HealthCheck entry</h3>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
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
          type="date"
          placeholder="YYYY-MM-DD"
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
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="type-id">Type</InputLabel>
            <Select
              labelId="type-id"
              id="type-selector"
              value={type}
              label="Age"
              onChange={(event) => setType(event.target.value as HealthType)}
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
          </FormControl>
        </Box>
        {renderHealthbaseEntry()}
        <FormControl fullWidth sx={{ marginTop: "10px" }}>
          <InputLabel id="demo-multiple-checkbox-label">
            Diagnoses Codes
          </InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={baseEntry.diagnosisCodes}
            onChange={handleChange}
            input={<OutlinedInput label="Diagnoses Code" />}
            renderValue={(selected) => selected[1] && selected.join(", ")}
            MenuProps={MenuProps}
          >
            {diagnosesCodeList.map((code) => (
              <MenuItem key={code} value={code}>
                <Checkbox checked={baseEntry.diagnosisCodes.includes(code)} />
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
};

export default NewEntryForm;
