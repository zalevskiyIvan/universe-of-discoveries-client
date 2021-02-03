import API from "../DAL/API";
import { ActionTypes } from "../store";

export type arrType = {
  header: string;
  body: string;
  klass: any;
  subject: string;
  _id?: string;
  choise?: string;
  link: string;
  description: string;
  date: string;
  img: string;
};
export type userfulLinksType = {
  link: string;
  description: string;
  _id?: number;
};
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
  _id?: string;
};
const initianState = {
  events: [] as Array<arrType>,
  tasks: [] as Array<arrType>,
  shortProjects: [] as Array<arrType>,
  userfulLinks: [] as Array<userfulLinksType>,
  projects: [] as Array<any>,
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
      };
    case "DELETE_EVENTS":
      return {
        ...state,
        events: [...state.events.filter((item) => item._id !== action.id)],
      };
    case "GET_TASK":
      return {
        ...state,
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
    case "CLEAR_FULL_PROJECT":
      debugger;
      return {
        ...state,
        projects: [],
      };
    case "GET_USEFUL_LINK":
      return {
        ...state,
        userfulLinks: action.part.reverse(),
      };
    default:
      return state;
  }
};
type actionType = ActionTypes<typeof actions>;
export const actions = {
  getEventsAC: (eventArr: Array<arrType>) =>
    ({ type: "GET_EVENTS", part: eventArr } as const),
  //
  deleteEventsAC: (id: string) => ({ type: "DELETE_EVENTS", id } as const),
  //
  getTaskAC: (taskArr: Array<arrType>) =>
    ({ type: "GET_TASK", part: taskArr } as const),
  //
  deleteTaskAC: (id: string) => ({ type: "DELETE_TASK", id } as const),
  //
  getShortProjectAC: (shortProjectArr: Array<arrType>) =>
    ({ type: "GET_SHORT_PROJECT", part: shortProjectArr } as const),
  //
  deleteProjectAC: (id: string) => ({ type: "DELETE_PROJECT", id } as const),
  //
  getFullProjectAC: (projectArr: Array<any>) =>
    ({ type: "GET_FULL_PROJECT", part: projectArr } as const),
  //
  clearFullProject: () => ({ type: "CLEAR_FULL_PROJECT" } as const),
  //
  getUsefulLinkAC: (linksArr: Array<userfulLinksType>) =>
    ({ type: "GET_USEFUL_LINK", part: linksArr } as const),
};

export const addEventT = (
  klass: any,
  header: string,
  body: string,
  img: string
) => {
  const date = new Date().toLocaleDateString();
  const subject = localStorage.subject;
  return (dispatch: any) => {
    const data = { klass, header, body, img, subject, date };
    API.addNewEvent(data);
  };
};

export const getEventT = (page: number) => {
  const klass = localStorage.klass;
  const subject = localStorage.subject;
  return (dispatch: any) => {
    API.getEvent(klass, subject, page).then((res: any) => {
      dispatch(actions.getEventsAC(res.data));
    });
  };
};
export const deleteEventT = (id: string) => {
  return (dispatch: any) => {
    API.deleteEvent(id).then((res: any) => {
      dispatch(actions.deleteEventsAC(res.data));
    });
  };
};
export const getEventsWithFilterT = (filter: string) => {
  const klass = localStorage.klass;
  const subject = localStorage.subject;
  return (dispatch: any) => {
    API.getEventsWithFilter(klass, subject, filter).then((res: any) => {
      dispatch(actions.getEventsAC(res.data));
    });
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
  return (dispatch: any) => {
    const data = { klass, header, body, img, subject, date };
    API.addNewTask(data);
  };
};

export const getTaskT = (page: number) => {
  const klass = localStorage.klass;
  const subject = localStorage.subject;
  return (dispatch: any) => {
    API.getTask(klass, subject, page).then((res: any) => {
      dispatch(actions.getTaskAC(res.data));
    });
  };
};
export const deleteTaskT = (id: string) => {
  return (dispatch: any) => {
    API.deleteTask(id).then((res: any) => {
      dispatch(actions.deleteTaskAC(res.data));
    });
  };
};
export const getTaskWithFilterT = (filter: string) => {
  const klass = localStorage.klass;
  const subject = localStorage.subject;
  return (dispatch: any) => {
    API.getTaskWithFilter(klass, subject, filter).then((res: any) => {
      dispatch(actions.getTaskAC(res.data));
    });
  };
};

//

export const addUsefulLinkT = (link: string, description: string) => {
  return (dispatch: any) => {
    API.addNewUsefulLink(link, description);
  };
};

export const getUsefulLinkT = () => {
  return (dispatch: any) => {
    API.getUsefulLink().then((res: any) => {
      dispatch(actions.getUsefulLinkAC(res.data));
    });
  };
};

//

export const getShortProjectT = (page: number) => {
  const subject = localStorage.subject;
  return (dispatch: any) => {
    API.getShortProject(subject, page).then((res: any) => {
      dispatch(actions.getShortProjectAC(res.data));
    });
  };
};
export const deleteProjectT = (id: string) => {
  return (dispatch: any) => {
    API.deleteProject(id).then((res: any) => {
      dispatch(actions.deleteProjectAC(res.data));
    });
  };
};
export const getShortProjectWithFilterT = (filter: string) => {
  const klass = localStorage.klass;
  const subject = localStorage.subject;
  return (dispatch: any) => {
    API.getProjectWithFilter(klass, subject, filter).then((res: any) => {
      dispatch(actions.getShortProjectAC(res.data));
    });
  };
};

export type imgArr = {
  imgURL: string;
  id: number;
};

export const addProjectT = (data: projectType) => {
  return (dispatch: any) => {
    API.addProject(data);
  };
};

export const getProjectT = (id: number) => {
  const subject = localStorage.subject;
  return (dispatch: any) => {
    API.getProject(subject, id).then((res: any) => {
      dispatch(actions.getFullProjectAC(res.data));
    });
  };
};

export default addPostReducer;
