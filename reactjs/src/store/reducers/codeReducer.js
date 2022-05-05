import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  gender: [],
  isLoadingRole: false,
  role: [],
  isLoadingTime: false,
  time: [],
  isLoadingAction: false,
  action: [],
  isLoadingStatus: false,
  status: [],
};

const codeReducer = (state = initialState, action) => {
  switch (action.type) {
    // GENDER
    case actionTypes.GET_GENDER_START:
      state.isLoadingGender = true;
      return {
        ...state,
      };
    case actionTypes.GET_GENDER_SUCCESS:
      state.gender = action.data;
      state.isLoadingGender = false;
      return {
        ...state,
      };
    case actionTypes.GET_GENDER_FAIL:
      state.isLoadingGender = false;
      state.gender = [];
      return {
        ...state,
      };
    // ROLE
    case actionTypes.GET_ROLE_START:
      state.isLoadingRole = true;
      return {
        ...state,
      };
    case actionTypes.GET_ROLE_SUCCESS:
      state.role = action.data;
      state.isLoadingRole = false;
      return {
        ...state,
      };
    case actionTypes.GET_ROLE_FAIL:
      state.isLoadingRole = false;
      state.role = [];
      return {
        ...state,
      };
    // TIME
    case actionTypes.GET_TIME_START:
      state.isLoadingTime = true;
      return {
        ...state,
      };
    case actionTypes.GET_TIME_SUCCESS:
      state.time = action.data;
      state.isLoadingTime = false;
      return {
        ...state,
      };
    case actionTypes.GET_TIME_FAIL:
      state.isLoadingTime = false;
      state.time = [];
      return {
        ...state,
      };
    // ACTION
    case actionTypes.GET_ACTION_START:
      state.isLoadingAction = true;
      return {
        ...state,
      };
    case actionTypes.GET_ACTION_SUCCESS:
      state.action = action.data;
      state.isLoadingAction = false;
      return {
        ...state,
      };
    case actionTypes.GET_ACTION_FAIL:
      state.isLoadingAction = false;
      state.action = [];
      return {
        ...state,
      };
    // STATUS
    case actionTypes.GET_STATUS_START:
      state.isLoadingStatus = true;
      return {
        ...state,
      };
    case actionTypes.GET_STATUS_SUCCESS:
      state.status = action.data;
      state.isLoadingStatus = false;
      return {
        ...state,
      };
    case actionTypes.GET_STATUS_FAIL:
      state.isLoadingStatus = false;
      state.status = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default codeReducer;
