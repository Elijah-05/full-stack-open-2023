import { Button, Grid, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { EntryWithoutId, HealthType } from "../../types";

const initialFormValues = {
  type: HealthType.HEALTH_CHECK,
  description: "",
  date: "",
  specialist: "",
  healthCheckRating: "1",
  diagnosisCodes: "",
};

interface NewEntryFormProp {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddNewEntry: (formatedEntry: EntryWithoutId) => void;
  handleError: (message: string) => void;
}

const NewEntryForm = ({
  setShowForm,
  handleAddNewEntry,
  handleError,
}: NewEntryFormProp) => {
  const [entries, setEntries] = useState(initialFormValues);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!entries.date || !entries.description || !entries.specialist) {
      handleError("All fields are required");
    } else {
      const formatedEntry: EntryWithoutId = {
        date: entries.date,
        description: entries.description,
        specialist: entries.specialist,
        healthCheckRating: Number(entries.healthCheckRating),
        type: HealthType.HEALTH_CHECK,
        diagnosisCodes: entries.diagnosisCodes.split(","),
      };

      handleAddNewEntry(formatedEntry);
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
          value={entries.description}
          onChange={({ target }) =>
            setEntries({ ...entries, description: target.value })
          }
        />
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={entries.date}
          onChange={({ target }) =>
            setEntries({ ...entries, date: target.value })
          }
        />
        <TextField
          label="Specialist"
          placeholder="specialist name"
          fullWidth
          value={entries.specialist}
          onChange={({ target }) =>
            setEntries({ ...entries, specialist: target.value })
          }
        />
        <TextField
          label="Healthcheck rating"
          fullWidth
          value={entries.healthCheckRating}
          onChange={({ target }) =>
            setEntries({
              ...entries,
              healthCheckRating:
                !isNaN(Number(target.value)) || target.value === ""
                  ? target.value
                  : entries.healthCheckRating,
            })
          }
        />
        <TextField
          label="Diagnosis codes"
          fullWidth
          value={entries.diagnosisCodes}
          onChange={({ target }) =>
            setEntries({ ...entries, diagnosisCodes: target.value })
          }
        />
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
