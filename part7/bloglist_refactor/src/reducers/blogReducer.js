import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const blogReducer = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    initialize: (state, action) => {
      return action.payload.sort((a, b) => b.likes - a.likes);
    },
    addNewBlog: (state, action) => {
      state.push(action.payload);
      return state;
    },
    likeBlog: (state, action) => {
      const modifiedLike = state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog,
      );
      return modifiedLike;
    },
    deleteBlog: (state, action) => {
      if (state.some((blog) => blog.id == action.payload)) {
        return state.filter((blog) => blog.id != action.payload);
      }
    },
  },
});

export const initializeBlog = (blogs) => {
  return async (dispatch) => {
    await dispatch(blogReducer.actions.initialize(blogs));
  };
};

export const createNewBlog = (content) => {
  return async (dispatch) => {
    await dispatch(blogReducer.actions.addNewBlog(content));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    await dispatch(blogReducer.actions.likeBlog(blog));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await dispatch(blogReducer.actions.deleteBlog(id));
  };
};

// export const { addNewBlog, deleteBlog } = blogReducer.actions;
export default blogReducer.reducer;
