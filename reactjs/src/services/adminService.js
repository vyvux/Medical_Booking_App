import axios from "../axios";

/** Manage Users */
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

/** Manage Branches */
const getAllBranches = (inputId) => {
  return axios.get(`/api/get-all-branches?id=${inputId}`);
};

const createNewBranch = (data) => {
  return axios.post("/api/create-branch", data);
};

const editBranch = (data) => {
  return axios.put("/api/edit-branch", data);
};

const deleteBranch = (branchId) => {
  return axios.delete("/api/delete-branch", { data: { id: branchId } });
};
export { getAllUsers, createNewUserByAdmin, deleteUserByAdmin, editUserByAdmin, getAllBranches, createNewBranch, editBranch, deleteBranch };
