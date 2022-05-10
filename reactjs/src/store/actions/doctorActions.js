import actionTypes from "./actionTypes";
import { getAllDoctors } from "../../services/adminService";

//BRANCH
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
