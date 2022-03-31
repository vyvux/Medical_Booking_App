import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password }); // pass in data object
};

const getAllCodes = () => {
  return axios.get("/api/get-all-code");
};
export { handleLoginApi, getAllCodes };
