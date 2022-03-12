import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password }); // pass in data object
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserByAdmin = (data) => {
  return axios.post("/api/create-system-user", data);
};

const deleteUserByAdmin = (userId) => {
  return axios.delete("/api/delete-system-user", { data: { id: userId } });
};

const editUserByAdmin = (data) => {
  return axios.put("/api/edit-system-user", data);
};

export { handleLoginApi, getAllUsers, createNewUserByAdmin, deleteUserByAdmin, editUserByAdmin };
