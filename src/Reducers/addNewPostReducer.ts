import { Dispatch } from "react";
import { useHistory } from "react-router-dom";
import API from "../DAL/API";
import { ActionTypes } from "../store";

export type arrType = {
  header: string;
  body: string;
  klass: any;
  subject: string;
  _id?: string;
  choise?: string;
  link?: string;
  description?: string;
  date: string;
  img: string;
};
export type userfulLinksType = {
  link: string;
  description: string;
  _id?: number;
};
const initianState = {
  events: [] as Array<arrType>,
  tasks: [] as Array<arrType>,
  shortProjects: [] as Array<arrType>,
  userfulLinks: [] as Array<userfulLinksType>,
  projects: [] as Array<any>,
  statusCode: 0,
  totalCount: 0,
};
type stateType = typeof initianState;
const addPostReducer = (
  state = initianState,
  action: actionType
): stateType => {
  switch (action.type) {
    case "GET_EVENTS":
      return {
        ...state,
        events: action.part.reverse(),
        totalCount: action.totalCount,
      };
    case "DELETE_EVENTS":
      return {
        ...state,
        events: [...state.events.filter((item) => item._id !== action.id)],
      };
    case "GET_TASK":
      return {
        ...state,
        totalCount: action.totalCount,
        tasks: action.part.reverse(),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: [...state.tasks.filter((item) => item._id !== action.id)],
      };
    case "GET_SHORT_PROJECT":
      return {
        ...state,
        totalCount: action.totalCount,
        shortProjects: action.part.reverse(),
      };
    case "DELETE_PROJECT":
      return {
        ...state,
        shortProjects: [
          ...state.shortProjects.filter((item) => item._id !== action.id),
        ],
      };
    case "GET_FULL_PROJECT":
      return {
        ...state,
        projects: action.part,
      };
    case "CLEAR":
      return {
        ...state,
        projects: [],
        shortProjects: [],
        events: [],
        tasks: [],
        totalCount: 0,
      };
    case "GET_USEFUL_LINK":
      return {
        ...state,
        userfulLinks: action.part.reverse(),
      };
    case "STATUS_CODE":
      return {
        ...state,
        statusCode: action.statusCode,
      };
    default:
      return state;
  }
};
type actionType = ActionTypes<typeof actions>;
export const actions = {
  getEventsAC: (eventArr: Array<ReceivedPostType>, totalCount: number) =>
    ({ type: "GET_EVENTS", part: eventArr, totalCount } as const),
  //
  deleteEventsAC: (id: string) => ({ type: "DELETE_EVENTS", id } as const),
  //
  getTaskAC: (taskArr: Array<ReceivedPostType>, totalCount: number) =>
    ({ type: "GET_TASK", part: taskArr, totalCount } as const),
  //
  deleteTaskAC: (id: string) => ({ type: "DELETE_TASK", id } as const),
  //
  getShortProjectAC: (shortProjectArr: Array<arrType>, totalCount: number) =>
    ({ type: "GET_SHORT_PROJECT", part: shortProjectArr, totalCount } as const),
  //
  deleteProjectAC: (id: string) => ({ type: "DELETE_PROJECT", id } as const),
  //
  getFullProjectAC: (projectArr: Array<any>) =>
    ({ type: "GET_FULL_PROJECT", part: projectArr } as const),
  //
  clear: () => ({ type: "CLEAR" } as const),
  //
  statusCodeAC: (statusCode: number) =>
    ({ type: "STATUS_CODE", statusCode } as const),
  //
  getUsefulLinkAC: (linksArr: Array<userfulLinksType>) =>
    ({ type: "GET_USEFUL_LINK", part: linksArr } as const),
};
export type ReceivedPostType = {
  klass: string;
  header: string;
  body: string;
  img: string;
  subject: string;
  date: string;
};
export const addEventT = (
  klass: any,
  header: string,
  body: string,
  img: string
) => {
  const date = new Date().toLocaleDateString();
  const subject = localStorage.subject;
  return async (dispatch: any) => {
    const data: ReceivedPostType = { klass, header, body, img, subject, date };
    const res = await API.addNewEvent(data);
    if (res.status == 205) {
      dispatch(actions.statusCodeAC(res.status));
    }
  };
};

export const getEventT = (page: number) => {
  let klass = localStorage.klass;
  const subject = localStorage.subject;
  if (!klass) klass = 0;
  return async (dispatch: any) => {
    const res = await API.getEvent(klass, subject, page);
    dispatch(actions.getEventsAC(res.data.events, res.data.totalCount));
  };
};
export const deleteEventT = (id: string) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await API.deleteEvent(id);
    if (res.status == 205) {
      dispatch(actions.statusCodeAC(res.status));
    }
    if (res.data) dispatch(actions.deleteEventsAC(res.data));
  };
};
export const getEventsWithFilterT = (filter: string) => {
  let klass = localStorage.klass;
  const subject = localStorage.subject;
  if (!klass) klass = 0;
  return async (dispatch: Dispatch<actionType>) => {
    const res = await API.getEventsWithFilter(klass, subject, filter);
    dispatch(actions.getEventsAC(res.data, 1));
  };
};

//

export const addTaskT = (
  klass: any,
  header: string,
  body: string,
  img: string
) => {
  const date = new Date().toLocaleDateString();
  const subject = localStorage.subject;
  return async (dispatch: Dispatch<actionType>) => {
    const data = { klass, header, body, img, subject, date };
    const res = await API.addNewTask(data);
    if (res.status == 205) {
      dispatch(actions.statusCodeAC(res.status));
    }
  };
};

export const getTaskT = (page: number) => {
  let klass = localStorage.klass;
  const subject = localStorage.subject;
  if (!klass) klass = 0;
  return async (dispatch: Dispatch<actionType>) => {
    const res = await API.getTask(klass, subject, page);
    dispatch(actions.getTaskAC(res.data.tasks, res.data.totalCount));
  };
};
export const deleteTaskT = (id: string) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await API.deleteTask(id);
    if (res.status == 205) {
      dispatch(actions.statusCodeAC(res.status));
    }
    dispatch(actions.deleteTaskAC(res.data));
  };
};
export const getTaskWithFilterT = (filter: string) => {
  let klass = localStorage.klass;
  const subject = localStorage.subject;
  if (!klass) klass = 0;
  return async (dispatch: Dispatch<actionType>) => {
    const res = await API.getTaskWithFilter(klass, subject, filter);
    dispatch(actions.getTaskAC(res.data, res.data.length));
  };
};

//

export const addUsefulLinkT = (link: string, description: string) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await API.addNewUsefulLink(link, description);
    if (res.status == 205) {
      dispatch(actions.statusCodeAC(res.status));
    }
  };
};

export const getUsefulLinkT = () => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await API.getUsefulLink();
    dispatch(actions.getUsefulLinkAC(res.data));
  };
};

//

export type projectType = {
  header: String;
  purpose: String;
  tasks: [String];
  relevance: String;
  conclusions: String;
  results: String;
  subject: String;
  date: String;
  // img: [{imgURL: String, id: Number}],
  // presentationHtml: String,
  shortDescription: String;
  members: [String];
  allowed: boolean;
  _id?: string;
};

export const getShortProjectT = (page: number) => {
  const subject = localStorage.subject;
  return async (dispatch: Dispatch<actionType>) => {
    const res = await API.getShortProject(subject, page);
    debugger;
    dispatch(actions.getShortProjectAC(res.data.projects, res.data.totalCount));
  };
};
export const deleteProjectT = (id: string) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await API.deleteProject(id);
    if (res.status == 205) {
      dispatch(actions.statusCodeAC(res.status));
    }
    dispatch(actions.deleteProjectAC(res.data));
  };
};
export const getShortProjectWithFilterT = (filter: string) => {
  const subject = localStorage.subject;
  return async (dispatch: Dispatch<actionType>) => {
    const res = await API.getProjectWithFilter(subject, filter);
    dispatch(actions.getShortProjectAC(res.data, res.data.length));
  };
};

export const getPendingProjectWithFilterT = (filter: string) => {
  const subject = localStorage.subject;
  return async (dispatch: Dispatch<actionType>) => {
    const res = await API.getPendingProjectWithFilter(subject, filter);
    if (res.status == 205) {
      dispatch(actions.statusCodeAC(res.status));
    }
    dispatch(actions.getShortProjectAC(res.data, res.data.length));
  };
};

export type imgArr = {
  imgURL: string;
  id: number;
};

export const addProjectT = (data: projectType) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await API.addProject(data);
    debugger;
    const payload = res.data;
    dispatch(actions.getFullProjectAC(payload));
  };
};

export const getProjectT = (id: number) => {
  const subject = localStorage.subject;
  return async (dispatch: Dispatch<actionType>) => {
    const res = await API.getProject(subject, id);
    dispatch(actions.getFullProjectAC(res.data));
  };
};

export const getPendingProjectT = (page: number) => {
  const subject = localStorage.subject;
  return async (dispatch: Dispatch<actionType>) => {
    const res = await API.getPendingProject(subject, page);
    if (res.status == 205) {
      dispatch(actions.statusCodeAC(res.status));
    }
    dispatch(actions.getShortProjectAC(res.data.projects, res.data.totalCount));
  };
};

export const allowProjectT = (id: string) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await API.allowProject(id);
    if (res.status == 205) {
      dispatch(actions.statusCodeAC(res.status));
    }
    dispatch(actions.deleteProjectAC(res.data));
  };
};

export default addPostReducer;
