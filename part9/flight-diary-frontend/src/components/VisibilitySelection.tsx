import { VisibilitySelectionProps } from "../types";

const VisibilitySelection = ({
  visibility,
  handleChangeInput,
}: VisibilitySelectionProps) => {
  return (
    <div>
      <span style={{ marginRight: "14px" }}>Visibility </span>
      <label>
        Great
        <input
          value="great"
          type="radio"
          name="visibility"
          checked={visibility === "great"}
          onChange={handleChangeInput}
        />
      </label>

      <label>
        Good
        <input
          value="good"
          type="radio"
          name="visibility"
          checked={visibility === "good"}
          onChange={handleChangeInput}
        />
      </label>
      <label>
        Ok
        <input
          value="ok"
          type="radio"
          name="visibility"
          checked={visibility === "ok"}
          onChange={handleChangeInput}
        />
      </label>
      <label>
        Poor
        <input
          value="poor"
          type="radio"
          name="visibility"
          checked={visibility === "poor"}
          onChange={handleChangeInput}
        />
      </label>
    </div>
  );
};

export default VisibilitySelection;
