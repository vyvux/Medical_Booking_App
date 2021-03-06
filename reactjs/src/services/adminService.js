import axios from "../axios";

/** Manage Users */
const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`, { headers: { accessToken: localStorage.getItem("accessToken") } });
};

const createNewUserByAdmin = (data) => {
  return axios.post("/api/create-system-user", data, { headers: { accessToken: localStorage.getItem("accessToken") } });
};

const deleteUserByAdmin = (userId) => {
  return axios.delete("/api/delete-system-user", { data: { id: userId } }, { headers: { accessToken: localStorage.getItem("accessToken") } });
};

const editUserByAdmin = (data) => {
  return axios.put("/api/edit-system-user", data, { headers: { accessToken: localStorage.getItem("accessToken") } });
};

/** Manage Branches */
const getAllBranches = (inputId) => {
  return axios.get(`/api/get-all-branches?id=${inputId}`);
};

const createNewBranch = (data) => {
  return axios.post("/api/create-branch", data, { headers: { accessToken: localStorage.getItem("accessToken") } });
};

const editBranch = (data) => {
  return axios.put("/api/edit-branch", data, { headers: { accessToken: localStorage.getItem("accessToken") } });
};

const deleteBranch = (branchId) => {
  return axios.delete("/api/delete-branch", { data: { id: branchId } }, { headers: { accessToken: localStorage.getItem("accessToken") } });
};

/** Manage Service */
const getAllServices = (inputId) => {
  return axios.get(`/api/get-all-services?id=${inputId}`);
};

const createNewService = (data) => {
  return axios.post("/api/create-service", data, { headers: { accessToken: localStorage.getItem("accessToken") } });
};

const editService = (data) => {
  return axios.put("/api/edit-service", data, { headers: { accessToken: localStorage.getItem("accessToken") } });
};

const deleteService = (serviceId) => {
  return axios.delete("/api/delete-service", { data: { id: serviceId } }, { headers: { accessToken: localStorage.getItem("accessToken") } });
};

/** Manage Doctor */

const getAllDoctors = (inputId) => {
  return axios.get(`/api/get-all-doctors?id=${inputId}`);
};

const createNewDoctor = (data) => {
  return axios.post("/api/create-doctor", data, { headers: { accessToken: localStorage.getItem("accessToken") } });
};

const editDoctor = (data) => {
  return axios.put("/api/edit-doctor", data, { headers: { accessToken: localStorage.getItem("accessToken") } });
};

const deleteDoctor = (doctorUserId) => {
  return axios.delete("/api/delete-doctor", { data: { userId: doctorUserId } }, { headers: { accessToken: localStorage.getItem("accessToken") } });
};

/** Manage Log */
const addLog = (data) => {
  return axios.post("/api/add-log", data);
};

const getAllLogs = () => {
  return axios.get("/api/get-all-logs", { headers: { accessToken: localStorage.getItem("accessToken") } });
};

export {
  getAllUsers,
  createNewUserByAdmin,
  deleteUserByAdmin,
  editUserByAdmin,
  getAllBranches,
  createNewBranch,
  editBranch,
  deleteBranch,
  createNewService,
  getAllServices,
  editService,
  deleteService,
  getAllDoctors,
  createNewDoctor,
  editDoctor,
  deleteDoctor,
  addLog,
  getAllLogs,
};
