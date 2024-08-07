import { useState } from "react";
import { DiaryType, NewEntryPropType } from "../types";
import { createDiary } from "../services/services";
import WeatherSelection from "./WeatherSelection";
import VisibilitySelection from "./VisibilitySelection";

const initialEntry: NewEntryPropType = {
  date: "",
  visibility: "",
  weather: "",
  comment: "",
};

const DiaryForm = ({
  setDiary,
}: {
  setDiary: React.Dispatch<React.SetStateAction<DiaryType[]>>;
}) => {
  const [error, setError] = useState<string>("");
  const [entry, setEntry] = useState<NewEntryPropType>(initialEntry);
  let errorTimeout: NodeJS.Timeout;
  const { date, visibility, weather, comment } = entry;

  const handleError = (error: string) => {
    clearTimeout(errorTimeout);

    errorTimeout = setTimeout(() => {
      setError("");
    }, 1000 * 3);
    setError(error);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name;
    const value = e.target.value;
    setEntry((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!date || !visibility || !weather || !comment) {
      handleError("All fields are required!");
    } else {
      createDiary(entry)
        .then((res) => {
          setDiary((prev) => prev.concat(res.data));
          setEntry(initialEntry);
        })
        .catch((err) => handleError(err.response.data));
    }
  };

  return (
    <div>
      <h2>Add New Entry</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          alignItems: "flex-start",
        }}
      >
        <div>
          <span>Date </span>
          <input
            className="date-input"
            value={date}
            type="date"
            name="date"
            onChange={handleChangeInput}
          />
        </div>
        <VisibilitySelection
          visibility={visibility}
          handleChangeInput={handleChangeInput}
        />
        <WeatherSelection
          weather={weather}
          handleChangeInput={handleChangeInput}
        />
        <div>
          <span>Comment </span>
          <input
            className="comment-input"
            value={comment}
            type="text"
            name="comment"
            placeholder="Flight comment"
            onChange={handleChangeInput}
          />
        </div>
        <button
          style={{ marginTop: "10px", width: "100%", maxWidth: "350px" }}
          type="submit"
        >
          add
        </button>
      </form>
    </div>
  );
};

export default DiaryForm;
