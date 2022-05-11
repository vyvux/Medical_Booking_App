import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingDoctor: false,
  doctors: [],
  isLoadingSchedule: false,
  schedules: [],
};

const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
    // DOCTOR
    case actionTypes.GET_DOCTOR_START:
      state.isLoadingDoctor = true;
      return {
        ...state,
      };
    case actionTypes.GET_DOCTOR_SUCCESS:
      state.doctors = action.data;
      state.isLoadingDoctor = false;
      return {
        ...state,
      };
    case actionTypes.GET_DOCTOR_FAIL:
      state.isLoadingDoctor = false;
      state.doctors = [];
      return {
        ...state,
      };

    //REGISTERED SCHEDULE
    case actionTypes.GET_SCHEDULE_START:
      state.isLoadingSchedule = true;
      return {
        ...state,
      };
    case actionTypes.GET_SCHEDULE_SUCCESS:
      state.schedules = action.data;
      state.isLoadingSchedule = false;
      return {
        ...state,
      };
    case actionTypes.GET_SCHEDULE_FAIL:
      state.isLoadingSchedule = false;
      state.schedules = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default doctorReducer;
