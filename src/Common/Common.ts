export const re_auth_code = 403;
export const correct_password = "tyghcn";
export const chairsCount = 6;

//   TYPES:
export type editPostType = {
  body: string | undefined;
  shortDescription: string | undefined;
  header: string | undefined;
  date: string | undefined;
  id: string;
};
export type editFullProjectType = {
  header: string | undefined;
  purpose: string | undefined;
  tasks: any;
  relevance: string | undefined;
  conclusions: string | undefined;
  results: string | undefined;
  date: string | undefined;
  // img: [{imgURL: string, id: Number}],
  // presentationHtml: string | undefined;
  shortDescription: string | undefined;
  id: string;
  members: any;
};
export type subjectType = {
  subject: string;
  url: string;
};
export type chairType = {
  title: string;
  subjects: subjectType[];
  teachers: string[];
};
