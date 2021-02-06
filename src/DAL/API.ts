import axios from "axios";

const instanse = axios.create({
  baseURL: "https://universe-of-discoveries.herokuapp.com/api/",
  // baseURL: "http://localhost:3001/api/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.auth}`,
  },
});

export const API = {
  auth: () => {
    return instanse.get("auth");
  },

  //              Events
  addNewEvent: (data: any) => {
    return instanse.post("events", data);
  },
  getEvent: (klass: string, subject: string, page: number) => {
    return instanse.get(
      `events?klass=${klass}&subject=${subject}&page=${page}`
    );
  },
  deleteEvent: (id: string) => {
    return instanse.delete(`events?id=${id}`);
  },
  getEventsWithFilter: (klass: string, subject: string, filter: string) => {
    return instanse.get(
      `filter-events?klass=${klass}&subject=${subject}&filter=${filter}`
    );
  },

  //              Tasks
  addNewTask: (data: any) => {
    return instanse.post("tasks", data);
  },
  getTask: (klass: string, subject: string, page: number) => {
    return instanse.get(`tasks?klass=${klass}&subject=${subject}&page=${page}`);
  },
  deleteTask: (id: string) => {
    return instanse.delete(`tasks?id=${id}`);
  },
  getTaskWithFilter: (klass: string, subject: string, filter: string) => {
    return instanse.get(
      `filter-tasks?klass=${klass}&subject=${subject}&filter=${filter}`
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
  getProjectWithFilter: (subject: string, filter: string) => {
    return instanse.get(
      `filter-short-projects?&subject=${subject}&filter=${filter}`
    );
  },
  getPendingProject: (subject: string, page: number) => {
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
};
export default API;
