import { Dispatch } from "react";
import API from "../DAL/API";
import { ActionTypes } from "../store";

const initialState = {
  isAdmin: false,
};
type stateType = typeof initialState;

const autorizetReducer = (
  state = initialState,
  action: actionType
): stateType => {
  switch (action.type) {
    case "SET_IS_ADMIN":
      return {
        ...state,
        isAdmin: action.isAdmin,
      };
    default:
      return state;
  }
};
type actionType = ActionTypes<typeof actions>;
export const actions = {
  setIsAdmin: (isAdmin: boolean) =>
    ({ type: "SET_IS_ADMIN", isAdmin } as const),
};

export const getTokenT = (password: string) => {
  return async (dispatch: Dispatch<actionType>) => {
    await API.auth(password);
    dispatch(actions.setIsAdmin(true));
    localStorage.setItem("auth", "true");
  };
};

export default autorizetReducer;
