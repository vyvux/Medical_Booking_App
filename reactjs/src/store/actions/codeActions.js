import actionTypes from "./actionTypes";
import { getAllCodes } from "../../services/userService";
// GENDER
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.GET_GENDER_START });
      let res = await getAllCodes("gender");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.allCodes));
      } else {
        dispatch(fetchGenderFail());
      }
    } catch (e) {
      dispatch(fetchGenderFail());
      console.log("fetchGenderStart error", e);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.GET_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFail = () => ({
  type: actionTypes.GET_GENDER_FAIL,
});

// ROLE
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.GET_GENDER_START });
      let res = await getAllCodes("role");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.allCodes));
      } else {
        dispatch(fetchRoleFail());
      }
    } catch (e) {
      dispatch(fetchRoleFail());
      console.log("fetchRoleStart error", e);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.GET_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFail = () => ({
  type: actionTypes.GET_ROLE_FAIL,
});

//TIME
export const fetchTimeStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.GET_TIME_START });
      let res = await getAllCodes("time");
      if (res && res.errCode === 0) {
        dispatch(fetchTimeSuccess(res.allCodes));
      } else {
        dispatch(fetchTimeFail());
      }
    } catch (e) {
      dispatch(fetchTimeFail());
      console.log("fetchTimeStart error", e);
    }
  };
};

export const fetchTimeSuccess = (timeData) => ({
  type: actionTypes.GET_TIME_SUCCESS,
  data: timeData,
});

export const fetchTimeFail = () => ({
  type: actionTypes.GET_TIME_FAIL,
});

//ACTON
export const fetchActionStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.GET_ACTION_START });
      let res = await getAllCodes("actionType");
      if (res && res.errCode === 0) {
        dispatch(fetchActionSuccess(res.allCodes));
      } else {
        dispatch(fetchActionFail());
      }
    } catch (e) {
      dispatch(fetchActionFail());
      console.log("fetchActionStart error", e);
    }
  };
};

export const fetchActionSuccess = (actionData) => ({
  type: actionTypes.GET_ACTION_SUCCESS,
  data: actionData,
});

export const fetchActionFail = () => ({
  type: actionTypes.GET_ACTION_FAIL,
});
//STATUS
export const fetchStatusStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.GET_STATUS_START });
      let res = await getAllCodes("status");
      if (res && res.errCode === 0) {
        dispatch(fetchStatusSuccess(res.allCodes));
      } else {
        dispatch(fetchStatusFail());
      }
    } catch (e) {
      dispatch(fetchStatusFail());
      console.log("fetchStatusStart error", e);
    }
  };
};

export const fetchStatusSuccess = (statusData) => ({
  type: actionTypes.GET_STATUS_SUCCESS,
  data: statusData,
});

export const fetchStatusFail = () => ({
  type: actionTypes.GET_STATUS_FAIL,
});
