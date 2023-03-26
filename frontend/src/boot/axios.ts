import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:5000",
    "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS, PATCH",
  },
});
