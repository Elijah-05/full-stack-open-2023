import axios from "axios";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const getWeatherData = (lat, lon) => {
  const getData = axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    )
    .then((res) => res.data)
    .catch((err) => console.log("Unable to fetch weather: ", err));

  return getData;
};

export default { getWeatherData };
