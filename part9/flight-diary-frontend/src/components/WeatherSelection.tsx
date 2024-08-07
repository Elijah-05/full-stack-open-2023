import { WeatherSelectionProps } from "../types";

const WeatherSelection = ({
  weather,
  handleChangeInput,
}: WeatherSelectionProps) => {
  return (
    <div>
      <span>Weather </span>
      <label>
        Sunny
        <input
          value="sunny"
          type="radio"
          name="weather"
          checked={weather === "sunny"}
          onChange={handleChangeInput}
        />
      </label>

      <label>
        Rainy
        <input
          value="rainy"
          type="radio"
          name="weather"
          checked={weather === "rainy"}
          onChange={handleChangeInput}
        />
      </label>
      <label>
        Cloudy
        <input
          value="cloudy"
          type="radio"
          name="weather"
          checked={weather === "cloudy"}
          onChange={handleChangeInput}
        />
      </label>
      <label>
        Stormy
        <input
          value="stormy"
          type="radio"
          name="weather"
          checked={weather === "stormy"}
          onChange={handleChangeInput}
        />
      </label>
      <label>
        Windy
        <input
          value="windy"
          type="radio"
          name="weather"
          checked={weather === "windy"}
          onChange={handleChangeInput}
        />
      </label>
    </div>
  );
};

export default WeatherSelection;
