import axios, { AxiosResponse } from "axios";
import { editPostType, editFullProjectType, chairType } from "../Common/Common";
import { arrType, ReceivedPostType } from "../Reducers/addNewPostReducer";

const instanse = axios.create({
  baseURL: "https://universe-of-discoveries-server.herokuapp.com/api/",
  // baseURL: "http://localhost:3001/api/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    SameSite: "none",
  },
  withCredentials: true,
});

export const API = {
  auth: (password: string) => {
    return instanse.post("auth", { password });
  },
  getChair: (page: number): Promise<AxiosResponse<chairType>> => {
    return instanse.get(`chairs?page=${page}`);
  },
  //              Events

  addNewEvent: (
    data: ReceivedPostType
  ): Promise<void | AxiosResponse<{ id: string }>> => {
    return instanse.post("events", data).catch((e: any) => {});
  },
  getEvent: (
    klass: string,
    subject: string,
    page: number
  ): Promise<AxiosResponse<{ events: arrType[]; totalCount: number }>> => {
    return instanse.get(
      `events?klass=${klass}&subject=${subject}&page=${page}`
    );
  },
  deleteEvent: (id: string) => {
    return instanse.delete(`events?id=${id}`).catch((e: any) => {});
  },
  getEventsWithFilter: (
    klass: string,
    subject: string,
    filter: string
  ): Promise<AxiosResponse<arrType[]>> => {
    return instanse.get(
      `filter-events?klass=${klass}&subject=${subject}&filter=${filter}`
    );
  },
  editEvents: (data: editPostType): any => {
    return instanse.put("events", data).catch((e: any) => {});
  },

  //              Tasks
  addNewTask: (data: ReceivedPostType) => {
    return instanse.post("tasks", data).catch((e: any) => {});
  },
  getTask: (
    klass: string,
    subject: string,
    page: number,
    parallel: string
  ): Promise<AxiosResponse<{ tasks: arrType[]; totalCount: number }>> => {
    return instanse.get(
      `tasks?klass=${klass}&subject=${subject}&page=${page}&parallel=${parallel}`
    );
  },
  deleteTask: (id: string) => {
    return instanse.delete(`tasks?id=${id}`).catch((e: any) => {});
  },
  editTask: (data: editPostType) => {
    return instanse.put("tasks", data);
  },
  getTaskWithFilter: (
    klass: string,
    subject: string,
    filter: string,
    parallel: string
  ) => {
    return instanse.get(
      `filter-tasks?klass=${klass}&subject=${subject}&filter=${filter}&parallel=${parallel}`
    );
  },

  //             ShortProjects
  getShortProject: (subject: string, page: number) => {
    return instanse.get(`short-projects?&subject=${subject}&page=${page}`);
  },
  deleteProject: (id: string) => {
    return instanse.delete(`short-projects?id=${id}`).catch((e: any) => {});
  },
  editShortProject: (data: editPostType) => {
    return instanse.put("short-projects", data).catch((e: any) => {});
  },
  getProjectWithFilter: (subject: string, filter: string) => {
    return instanse.get(
      `filter-short-projects?&subject=${subject}&filter=${filter}`
    );
  },
  // getPendingProject: (
  //   subject: string,
  //   page: number
  // ): Promise<AxiosResponse<{ projects: arrType[]; totalCount: number }>> => {
  //   return instanse.get(
  //     `pending-short-projects?&subject=${subject}&page=${page}`
  //   );
  // },
  allowProject: (id: string) => {
    return instanse.get(`allow-short-projects?&id=${id}`).catch((e: any) => {});
  },
  // getPendingProjectWithFilter: (subject: string, filter: string) => {
  //   return instanse.get(
  //     `pending-filter-short-projects?&subject=${subject}&filter=${filter}`
  //   );
  // },

  //              FullProjects
  addProject: (body: any) => {
    return instanse.post("projects", body).catch((e: any) => {});
  },
  getProject: (subject: string, id: number) => {
    return instanse.get(`projects?&subject=${subject}&id=${id}`);
  },
  editFullProject: (
    data: editFullProjectType
  ): Promise<any | AxiosResponse<{ data: any }>> => {
    return instanse
      .put("projects", data)
      .catch((err) => {})
      .catch((e: any) => {});
  },
};
export default API;
