import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; // Adjust if backend runs on different port

export const loginUser = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/users/login`, credentials);
  return response.data;
};

export const signupUser = async (userInfo) => {
  const response = await axios.post(`${BASE_URL}/users/signup`, userInfo);
  return response.data;
};
