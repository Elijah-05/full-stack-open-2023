import axios from "axios";

const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api/name/";

export const fetchCountry = async (name) => {
  if (name) {
    try {
      const response = await axios.get(`${BASE_URL}${name}`);
      return response.data;
    } catch (error) {
      console.error("An error occurred during country fetch: ", error);
      return null;
    }
  }
};
