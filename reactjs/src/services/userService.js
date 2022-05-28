import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password }); // pass in data object
};

const getAllCodes = (type) => {
  return axios.get(`/api/get-all-code?type=${type}`);
};

const getAllPatients = (patientId) => {
  return axios.get(`/api/get-all-patients?id=${patientId}`, { headers: { accessToken: localStorage.getItem("accessToken") } });
};

const editPatient = (data) => {
  return axios.put("/api/edit-patient", data, { headers: { accessToken: localStorage.getItem("accessToken") } });
};
export { handleLoginApi, getAllCodes, getAllPatients, editPatient };
