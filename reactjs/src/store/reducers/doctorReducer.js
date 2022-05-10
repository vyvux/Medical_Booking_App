import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingDoctor: false,
  doctors: [],
};

const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
    //BRANCH
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

    default:
      return state;
  }
};

export default doctorReducer;
