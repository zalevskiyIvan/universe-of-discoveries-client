export const re_auth_code = 403;
export const correct_password = "tyghcn";
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
