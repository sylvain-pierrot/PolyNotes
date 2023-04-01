import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": process.env.REACT_APP_BASE_URL,
    "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS, PATCH",
  },
});
