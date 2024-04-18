import axios from 'axios';

const getAllComments = async (blogID) => {
  const res = await axios.get(`/api/blogs/${blogID}/comments`);
  return res.data;
};

export { getAllComments };
