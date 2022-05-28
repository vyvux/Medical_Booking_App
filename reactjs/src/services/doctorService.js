import axios from "../axios";

const bulkCreateDoctorSchedule = (data) => {
  return axios.post("api/bulk-create-doctor-schedule", data, { headers: { accessToken: localStorage.getItem("accessToken") } });
};

const getDoctorSchedule = (data) => {
  return axios.post("/api/get-doctor-schedule", data, { headers: { accessToken: localStorage.getItem("accessToken") } });
};

export { bulkCreateDoctorSchedule, getDoctorSchedule };
