import axios from "axios";

const api = axios.create
({
  baseURL: "", // your API base in the comment
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
