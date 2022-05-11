import axios from "../axios";

const bulkCreateDoctorSchedule = (data) => {
  return axios.post("api/bulk-create-doctor-schedule", data);
};

const getDoctorSchedule = (data) => {
  return axios.post("/api/get-doctor-schedule", data);
};

export { bulkCreateDoctorSchedule, getDoctorSchedule };
