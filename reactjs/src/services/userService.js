import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password }); // pass in data object
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserByAdmin = (data) => {
  console.log("check data from service:", data);
  return axios.post("/api/create-system-user", data);
};

export { handleLoginApi, getAllUsers, createNewUserByAdmin };
