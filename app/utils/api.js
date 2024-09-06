import axios from "axios";

export const fetchPostsAPI = async () => {
  const response = await axios.get("/api/post");
  return response.data.post;
};

export const PostBlogAPI = async (blogPost) => {
  const response = await axios.post("/api/post", blogPost);
  return response.data;
};

export const loginAPI = async (credentials) => {
  const response = await axios.post("/api/user/login", credentials);

  return response.data;
};

export const signupAPI = async (userData) => {
  const response = await axios.post("/api/user/signup", userData);

  return response.data;
};
export const logout = async () => {
  const response = await axios.post("/user/logout");

  return response.data;
};
