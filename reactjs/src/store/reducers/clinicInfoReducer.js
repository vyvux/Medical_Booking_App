import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingBranch: false,
  isLoadingService: false,
  branches: [],
  services: [],
};

const clinicInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    //BRANCH
    case actionTypes.GET_BRANCH_START:
      state.isLoadingBranch = true;
      return {
        ...state,
      };
    case actionTypes.GET_BRANCH_SUCCESS:
      state.branches = action.data;
      state.isLoadingBranch = false;
      return {
        ...state,
      };
    case actionTypes.GET_BRANCH_FAIL:
      state.isLoadingBranch = false;
      state.branches = [];
      return {
        ...state,
      };
    //SERVICE
    case actionTypes.GET_SERVICE_START:
      state.isLoadingService = true;
      return {
        ...state,
      };
    case actionTypes.GET_SERVICE_SUCCESS:
      state.services = action.data;
      state.isLoadingService = false;
      return {
        ...state,
      };
    case actionTypes.GET_SERVICE_FAIL:
      state.isLoadingService = false;
      state.services = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default clinicInfoReducer;
