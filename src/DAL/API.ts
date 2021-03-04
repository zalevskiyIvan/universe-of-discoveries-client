import axios, { AxiosResponse } from "axios";
import { editPostType, editFullProjectType, chairType } from "../Common/Common";
import { arrType, ReceivedPostType } from "../Reducers/addNewPostReducer";

const instanse = axios.create({
  // baseURL: "https://universe-of-discoveries-server.herokuapp.com/api/",
  baseURL: "http://localhost:3001/api/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
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
  ): Promise<AxiosResponse<{ id: string }>> => {
    return instanse.post("events", data);
  },
  getEvent: (
    klass: string,
    subject: string,
    page: number,
    parallel: string
  ): Promise<AxiosResponse<{ events: arrType[]; totalCount: number }>> => {
    return instanse.get(
      `events?klass=${klass}&subject=${subject}&page=${page}&parallel=${parallel}`
    );
  },
  deleteEvent: (id: string) => {
    return instanse.delete(`events?id=${id}`);
  },
  getEventsWithFilter: (
    klass: string,
    subject: string,
    filter: string,
    parallel: string
  ): Promise<AxiosResponse<arrType[]>> => {
    return instanse.get(
      `filter-events?klass=${klass}&subject=${subject}&filter=${filter}&parallel=${parallel}`
    );
  },
  editEvents: (data: editPostType) => {
    return instanse.put("events", data);
  },

  //              Tasks
  addNewTask: (data: ReceivedPostType) => {
    return instanse.post("tasks", data);
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
    return instanse.delete(`tasks?id=${id}`);
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

  //              Ulink
  addNewUsefulLink: (link: string, description: string) => {
    return instanse.post("links", { link, description });
  },
  getUsefulLink: () => {
    return instanse.get("links");
  },

  //             ShortProjects
  getShortProject: (subject: string, page: number) => {
    return instanse.get(`short-projects?&subject=${subject}&page=${page}`);
  },
  deleteProject: (id: string) => {
    return instanse.delete(`short-projects?id=${id}`);
  },
  editShortProject: (data: editPostType) => {
    return instanse.put("short-projects", data);
  },
  getProjectWithFilter: (subject: string, filter: string) => {
    return instanse.get(
      `filter-short-projects?&subject=${subject}&filter=${filter}`
    );
  },
  getPendingProject: (
    subject: string,
    page: number
  ): Promise<AxiosResponse<{ projects: arrType[]; totalCount: number }>> => {
    return instanse.get(
      `pending-short-projects?&subject=${subject}&page=${page}`
    );
  },
  allowProject: (id: string) => {
    return instanse.get(`allow-short-projects?&id=${id}`);
  },
  getPendingProjectWithFilter: (subject: string, filter: string) => {
    return instanse.get(
      `pending-filter-short-projects?&subject=${subject}&filter=${filter}`
    );
  },

  //              FullProjects
  addProject: (body: any) => {
    return instanse.post("projects", body);
  },
  getProject: (subject: string, id: number) => {
    return instanse.get(`projects?&subject=${subject}&id=${id}`);
  },
  editFullProject: (
    data: editFullProjectType
  ): Promise<any | AxiosResponse<{ data: any }>> => {
    return instanse.put("projects", data).catch((err) => {});
  },
};
export default API;
