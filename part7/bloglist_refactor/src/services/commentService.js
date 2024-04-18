import axios from 'axios';

const getAllComments = async (blogID) => {
  const res = await axios.get(`/api/blogs/${blogID}/comments`);
  return res.data;
};

const createComment = async (commentObj) => {
  const res = await axios.post(
    `/api/blogs/${commentObj.blogID}/comments`,
    commentObj,
  );
  return res;
};

export { getAllComments, createComment };
