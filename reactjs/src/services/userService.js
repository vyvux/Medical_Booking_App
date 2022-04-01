import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password }); // pass in data object
};

const getAllCodes = () => {
  return axios.get("/api/get-all-code");
};

const getAllPatients = (patientId) => {
  return axios.get(`/api/get-all-patients?id=${patientId}`);
};
export { handleLoginApi, getAllCodes, getAllPatients };
