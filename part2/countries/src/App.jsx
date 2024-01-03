import { useCallback, useState } from "react";
import { useEffect } from "react";
import countryService from "./axios/countryService";
import weatherService from "./axios/weatherService";

const App = () => {
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [showenCountry, setShowenCountry] = useState({});
  const [weatherData, setWeatherData] = useState({
    wind: "",
    icon: "",
    temp: "",
  });
  const [warning, setWarning] = useState(true);

  useEffect(() => {
    countryService.getCountriesByName(search.trim()).then((res) => {
      search
        ? res.length >= 10
          ? (setWarning(true), setFilteredCountries([]))
          : res.length == 1
          ? (setFilteredCountries(res),
            setWarning(false),
            handleWeather(
              res[0].capitalInfo.latlng[0],
              res[0].capitalInfo.latlng[1]
            ))
          : (setFilteredCountries(res), setWarning(false))
        : setFilteredCountries([]);
    });
  }, [search]);

  //handle search input on Change
  const handleSearchInput = (event) => {
    const value = event.target.value;
    setSearch(value.toLowerCase());
    setShowenCountry({});
  };

  const handleShowDetail = (name) => {
    // const findCountry = showenCountry.hasHownProperty(name)
    setShowenCountry({ ...showenCountry, [name]: !showenCountry[name] });
  };

  //fetch weather data and store to 
  const handleWeather = useCallback((lat, lon) => {
    weatherService.getWeatherData(lat, lon).then((res) => {
      setWeatherData({
        wind: res.wind.speed,
        icon: res.weather[0].icon,
        temp: res.main.temp,
      });
    });
  }, []);

  return (
    <div>
      <div>
        find countries
        <input type="text" onChange={(e) => handleSearchInput(e)} />
      </div>
      {warning && search && <div>Too many matches, specify another filter</div>}
      {filteredCountries?.map((country) => {
        const {
          name: { common: countryName },
          capital,
          area,
          languages,
          flags: { svg },
        } = country;
        const languagesArray = Object.values(languages);
        return (
          <div key={countryName} style={{ marginTop: "5px" }}>
            {!showenCountry[countryName] && filteredCountries.length > 1 ? (
              <div>
                {countryName}
                <button onClick={() => handleShowDetail(countryName)}>
                  show
                </button>
              </div>
            ) : (
              <div>
                <h1>{countryName}</h1>
                <div>Capital {capital}</div>
                <div>Area {area}</div>
                <h3>Languages:</h3>
                <ul>
                  {languagesArray?.map((language) => {
                    return <li key={language}>{language}</li>;
                  })}
                </ul>
                <img style={{ width: "250px" }} src={svg} />
                {filteredCountries.length == 1 && (
                  <div>
                    <h1>Weather in {capital}</h1>
                    <h4>temperature {weatherData?.temp} Celcius</h4>
                    <img
                      style={{}}
                      src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                    />
                    <h4>wind {weatherData?.wind} m/s</h4>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default App;
