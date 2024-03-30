import axios from "axios";
import { useEffect, useState } from "react";
import { fetchCountry } from "../axios/axios_request";

const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api/name/";

export const useCountry = (name) => {
  const [country, setCountry] = useState({});

  useEffect(() => {
    (async () => {
      const response = await fetchCountry(name);
      setCountry(response);
    })();
  }, [name]);

  return country;
};

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};
