import axios from "axios";
const baseUrl = "/api/blogs";

const user = localStorage.getItem("user");
const parsedUser = JSON.parse(user);
let token = `Bearer ${parsedUser?.token}`;

const setToken = (tok) => {
  // console.log("setToken Called: with Tok: ", tok);
  token = `Bearer ${tok}`;
};

const getAllBlogs = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createBlog = async (blogObj) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, blogObj, config);
  return response.data;
};

const updateBlog = async (data) => {
  const id = `/${data.id}`;
  const config = {
    headers: { Authorization: token },
  };
  // console.log("token in service updateBlog: ", token);
  const response = await axios.put(baseUrl + id, data, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  // console.log(config);
  const response = await axios.delete(baseUrl + `/${id}`, config);
  return response.data;
};

export default { setToken, getAllBlogs, createBlog, updateBlog, deleteBlog };
