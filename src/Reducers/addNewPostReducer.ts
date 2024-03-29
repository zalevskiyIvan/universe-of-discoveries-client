import { Dispatch } from "react";
import { useHistory } from "react-router-dom";
import {
  editFullProjectType,
  editPostType,
  re_auth_code,
} from "../Common/Common";
import API from "../DAL/API";
import { ActionTypes } from "../store";

export type arrType = {
  header: string;
  body: string;
  klass: any;
  subject: string;
  _id?: string;
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
        events: action.part,
        totalCount: action.totalCount,
      };
    case "DELETE_EVENTS":
      return {
        ...state,
        events: [...state.events.filter((item) => item._id !== action.id)],
      };
    case "UPDATE_EVENT":
      return {
        ...state,
        events: [
          action.updatedEvent,
          ...state.events.filter((item) => item._id !== action.id),
        ],
      };
    case "GET_TASK":
      return {
        ...state,
        totalCount: action.totalCount,
        tasks: action.part,
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: [...state.tasks.filter((item) => item._id !== action.id)],
      };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: [
          action.updatedTask,
          ...state.tasks.filter((item) => item._id !== action.id),
        ],
      };
    case "GET_SHORT_PROJECT":
      return {
        ...state,
        totalCount: action.totalCount,
        shortProjects: action.part,
      };
    case "UPDATE_SHORT_PROJECT":
      return {
        ...state,
        shortProjects: [
          action.updatedProject,
          ...state.shortProjects.filter((item) => item._id !== action.id),
        ],
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
        projects: action.project,
      };
    case "UPDATE_FULL_PROJECT":
      return {
        ...state,
        projects: [action.updatedProject],
      };
    case "CLEAR":
      return {
        ...state,
        projects: [],
        shortProjects: [],
        events: [],
        tasks: [],
        totalCount: 0,
        statusCode: 0,
      };
    case "GET_USEFUL_LINK":
      return {
        ...state,
        userfulLinks: action.part,
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
  updateEvent: (updatedEvent: ReceivedPostType, id: string) =>
    ({ type: "UPDATE_EVENT", updatedEvent, id } as const),
  //
  getTaskAC: (taskArr: Array<ReceivedPostType>, totalCount: number) =>
    ({ type: "GET_TASK", part: taskArr, totalCount } as const),
  //
  deleteTaskAC: (id: string) => ({ type: "DELETE_TASK", id } as const),
  //
  updateTask: (updatedTask: ReceivedPostType, id: string) =>
    ({ type: "UPDATE_TASK", updatedTask, id } as const),
  //
  getShortProjectAC: (shortProjectArr: Array<arrType>, totalCount: number) =>
    ({ type: "GET_SHORT_PROJECT", part: shortProjectArr, totalCount } as const),
  //
  updateShortProject: (updatedProject: arrType, id: string) =>
    ({ type: "UPDATE_SHORT_PROJECT", updatedProject, id } as const),
  //
  deleteProjectAC: (id: string) => ({ type: "DELETE_PROJECT", id } as const),
  //
  getFullProjectAC: (...project: any) =>
    ({ type: "GET_FULL_PROJECT", project } as const),
  //
  updateFulltProject: (updatedProject: any, id: string) =>
    ({ type: "UPDATE_FULL_PROJECT", updatedProject, id } as const),
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

export const editPostT = (data: editPostType, typeOfPost: string) => {
  return async (dispatch: Dispatch<actionType>) => {
    let res;
    switch (typeOfPost) {
      case "events":
        res = await API.editEvents(data);
        res && dispatch(actions.updateEvent(res.data, data.id));

        break;
      case "tasks":
        res = await API.editTask(data);
        res && dispatch(actions.updateTask(res.data, data.id));
        break;
      case "projects":
        res = await API.editShortProject(data);
        res && dispatch(actions.updateShortProject(res.data, data.id));
        break;
    }

    !res && dispatch(actions.statusCodeAC(403));
  };
};

export const editFullProjectT = (data: editFullProjectType) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await API.editFullProject(data);

    !res && dispatch(actions.statusCodeAC(403));

    res && dispatch(actions.updateFulltProject(res.data, data.id));
  };
};

export const addEventT = (
  klass: any,
  header: string,
  body: string,
  img: string,
  date: string,
  subject: string
) => {
  return async (dispatch: Dispatch<actionType>) => {
    const data: ReceivedPostType = { klass, header, body, img, subject, date };
    const res = await API.addNewEvent(data);

    !res && dispatch(actions.statusCodeAC(403));
  };
};
export const getEventT = (page: number, subject: string, klass: string) => {
  return async (dispatch: any) => {
    const res = await API.getEvent(klass, subject, page);
    dispatch(actions.getEventsAC(res.data.events, res.data.totalCount));
  };
};
export const deleteEventT = (id: string) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await API.deleteEvent(id);

    !res && dispatch(actions.statusCodeAC(403));

    res && dispatch(actions.deleteEventsAC(id));
  };
};
export const getEventsWithFilterT = (
  filter: string,
  subject: string,
  klass: string
) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await API.getEventsWithFilter(klass, subject, filter);
    dispatch(actions.getEventsAC(res.data, 1));
  };
};

//

export const addTaskT = (
  klass: string,
  header: string,
  body: string,
  img: string,
  date: string,
  subject: string
) => {
  return async (dispatch: Dispatch<actionType>) => {
    const data = { klass, header, body, img, subject, date };
    const res = await API.addNewTask(data);

    !res && dispatch(actions.statusCodeAC(403));
  };
};

export const getTaskT = (page: number, subject: string) => {
  let klass = localStorage.klass;
  const parallel = localStorage.parallel;
  if (!klass) klass = 0;
  return async (dispatch: Dispatch<actionType>) => {
    const res = await API.getTask(klass, subject, page, parallel);
    dispatch(actions.getTaskAC(res.data.tasks, res.data.totalCount));
  };
};
export const deleteTaskT = (id: string) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await API.deleteTask(id);
    !res && dispatch(actions.statusCodeAC(403));

    res && dispatch(actions.deleteTaskAC(id));
  };
};
export const getTaskWithFilterT = (filter: string, subject: string) => {
  let klass = localStorage.klass;
  const parallel = localStorage.parallel;
  if (!klass) klass = 0;
  return async (dispatch: Dispatch<actionType>) => {
    const res = await API.getTaskWithFilter(klass, subject, filter, parallel);
    dispatch(actions.getTaskAC(res.data, res.data.length));
  };
};

//

export type projectType = {
  header: string;
  purpose: string;
  tasks: [string];
  relevance: string;
  conclusions: string;
  results: string;
  subject: string;
  date: string;
  // img: [{imgURL: string, id: Number}],
  // presentationHtml: string,
  shortDescription: string;
  members: [string];
  allowed: boolean;
  _id: string;
};

export const getShortProjectT = (page: number, subject: string) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await API.getShortProject(subject, page);
    dispatch(actions.getShortProjectAC(res.data.projects, res.data.totalCount));
  };
};
export const deleteProjectT = (id: string) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await API.deleteProject(id);
    !res && dispatch(actions.statusCodeAC(403));

    res && dispatch(actions.deleteProjectAC(id));
  };
};
export const getShortProjectWithFilterT = (filter: string, subject: string) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await API.getProjectWithFilter(subject, filter);
    dispatch(actions.getShortProjectAC(res.data, res.data.length));
  };
};

// export const getPendingProjectWithFilterT = (
//   filter: string,
//   subject: string
// ) => {
//   return async (dispatch: Dispatch<actionType>) => {
//     const res = await API.getPendingProjectWithFilter(subject, filter);
//     if (!res) {
//       return dispatch(actions.statusCodeAC(403));
//     }
//     dispatch(actions.getShortProjectAC(res.data, res.data.length));
//   };
// };

export type imgArr = {
  imgURL: string;
  id: number;
};

export const addProjectT = (data: projectType) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await API.addProject(data);
    !res && dispatch(actions.statusCodeAC(403));
  };
};

export const getProjectT = (id: number, subject: string) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await API.getProject(subject, id);
    dispatch(actions.getFullProjectAC(...res.data));
  };
};

// export const getPendingProjectT = (page: number, subject: string) => {
//   return async (dispatch: Dispatch<actionType>) => {
//     const res = await API.getPendingProject(subject, page);
//     if (!res) {
//       return dispatch(actions.statusCodeAC(403));
//     }
//     dispatch(actions.getShortProjectAC(res.data.projects, res.data.totalCount));
//   };
// };

export const allowProjectT = (id: string) => {
  return async (dispatch: Dispatch<actionType>) => {
    const res = await API.allowProject(id);
    !res && dispatch(actions.statusCodeAC(403));
  };
};

export default addPostReducer;
