import actionTypes from "./actionTypes";
import { getAllBranches, getAllServices } from "../../services/adminService";

//BRANCH
export const fetchBranchStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.GET_BRANCH_START });
      let res = await getAllBranches("ALL");
      console.log("check get branch:", res);
      if (res && res.errCode === 0) {
        dispatch(fetchBranchSuccess(res.branches));
      } else {
        dispatch(fetchBranchFail());
      }
    } catch (e) {
      dispatch(fetchBranchFail());
      console.log("fetchBranchStart error", e);
    }
  };
};

export const fetchBranchSuccess = (branchData) => ({
  type: actionTypes.GET_BRANCH_SUCCESS,
  data: branchData,
});

export const fetchBranchFail = () => ({
  type: actionTypes.GET_BRANCH_FAIL,
});

//SERVICE
export const fetchServiceStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.GET_SERVICE_START });
      let res = await getAllServices("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchServiceSuccess(res.services));
      } else {
        dispatch(fetchServiceFail());
      }
    } catch (e) {
      dispatch(fetchServiceFail());
      console.log("fetchServiceStart error", e);
    }
  };
};

export const fetchServiceSuccess = (serviceData) => ({
  type: actionTypes.GET_SERVICE_SUCCESS,
  data: serviceData,
});

export const fetchServiceFail = () => ({
  type: actionTypes.GET_SERVICE_FAIL,
});
