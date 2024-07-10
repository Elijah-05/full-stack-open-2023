import axios from 'axios'
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";


const getAllCountries = async() => {
  const response = await axios.get(baseUrl);
  return response.data
};

const getCountriesByName = async(name) => {
  const response = getAllCountries()
  const filteredResult = response.then(res => res?.filter(country => country?.name.common.toLowerCase().includes(name)))
  return filteredResult
}

export default { getAllCountries, getCountriesByName };
