import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export const useResource = (url) => {
  const [resource, setResource] = useState([]);

  const getAll = async () => {
    const response = await axios.get(url);
    setResource(response.data);
  };

  useEffect(() => {
    getAll();
  }, [url]);

  const create = async (newObject) => {
    const response = await axios.post(url, newObject);
    response.status === 201 && setResource([...resource, response.data]);
  };

  const update = async (id, newObject) => {
    const response = await axios.put(`${url}/${id}`, newObject);
    return response.data;
  };

  const service = {
    create,
    update,
  };

  return [resource, service];
};

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  const onReset = () => {
    setValue("");
  };

  return {
    attributes: { type, value, onChange },
    reset: onReset,
  };
};
