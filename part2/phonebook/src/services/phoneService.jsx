import axios from "axios";
const baseUrl = "/api/persons";

const getContacts = async () => {
  const response = axios.get(baseUrl);
  return await response.then((res) => res.data);
};

const createContact = async (contactObject) => {
  const response = axios.post(baseUrl, contactObject);
  return await response.then((res) => res.data);
};

const updateContact = async (id, updateData) => {
  const response = axios.put(`${baseUrl}/${id}`, updateData);
  return await response.then((res) => res.data);
};

const deleteContact = async (id) => {
  const response = axios.delete(`${baseUrl}/${id}`);
  return await response.then((res) => res.data);
};

export default { getContacts, createContact, updateContact, deleteContact };
