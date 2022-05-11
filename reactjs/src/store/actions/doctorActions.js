import actionTypes from "./actionTypes";
import { getAllDoctors } from "../../services/adminService";
import { getDoctorSchedule } from "../../services/doctorService";

// DOCTOR LIST
export const fetchDoctorStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.GET_DOCTOR_START });
      let res = await getAllDoctors("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchDoctorSuccess(res.doctors));
      } else {
        dispatch(fetchDoctorFail());
      }
    } catch (e) {
      dispatch(fetchDoctorFail());
      console.log("fetchDoctorStart error", e);
    }
  };
};

export const fetchDoctorSuccess = (doctorData) => ({
  type: actionTypes.GET_DOCTOR_SUCCESS,
  data: doctorData,
});

export const fetchDoctorFail = () => ({
  type: actionTypes.GET_DOCTOR_FAIL,
});

// REGISTERED DOCTOR SCHEDULE
export const fetchScheduleStart = (scheduleData) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.GET_SCHEDULE_START });
      let res = await getDoctorSchedule(scheduleData);
      if (res && res.errCode === 0) {
        dispatch(fetchScheduleSuccess(res.schedule));
      } else {
        dispatch(fetchScheduleFail());
      }
    } catch (e) {
      dispatch(fetchScheduleFail());
      console.log("fetchScheduleStart error", e);
    }
  };
};

export const fetchScheduleSuccess = (scheduleData) => ({
  type: actionTypes.GET_SCHEDULE_SUCCESS,
  data: scheduleData,
});

export const fetchScheduleFail = () => ({
  type: actionTypes.GET_SCHEDULE_FAIL,
});
