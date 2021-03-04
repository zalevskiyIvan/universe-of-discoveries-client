import { act } from "@testing-library/react";
import { Dispatch } from "react";
import { chairType } from "../Common/Common";
import API from "../DAL/API";
import { ActionTypes } from "../store";

const initialState = {
  chair: {} as chairType | null,
};
type stateType = typeof initialState;

export const chairReducer = (
  state = initialState,
  action: actionType
): stateType => {
  switch (action.type) {
    case "GET_CHAIR":
      return {
        ...state,
        chair: action.chair,
      };
    case "CLEAR":
      return {
        ...state,
        chair: null,
      };
    default:
      return state;
  }
};

type actionType = ActionTypes<typeof actions>;

const actions = {
  getChairAC: (chair: chairType) => ({ type: "GET_CHAIR", chair } as const),
  clearAC: () => ({ type: "CLEAR" } as const),
};

export const getChairT = (page: number) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await API.getChair(page);
    dispatch(actions.getChairAC(res.data));
  };
};
