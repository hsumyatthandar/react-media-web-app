import axios from "axios";

const api = axios.create({
  baseURL: 'https://content.guardianapis.com',
});
export default api;