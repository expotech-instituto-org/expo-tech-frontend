import {
  ICreateExhibitionBody,
  ICreateProjectBody,
  ICreateReviewBody,
  ICreateUserBody,
  IGetProjectsParams,
  IGetProjectsResponse,
  IGetUsersResponse,
  ILoginBody,
  IUpdateExhibitionBody,
  IUpsertClassBody,
} from "@/types/backendTypes";
import { api } from "./api";

class Service {
  getUsers = () => api.get("/users");

  postCreateUser = ({ body }: { body: ICreateUserBody }) =>
    api.post("/users", body);

  getUserById = ({ user_id }: { user_id: string }) =>
    api.get(`/users/${user_id}`);

  putUpdateUser = ({
    user_id,
    body,
  }: {
    body: IGetUsersResponse;
    user_id: string;
  }) => api.put(`/users/${user_id}`, body);

  deleteUser = ({ user_id }: { user_id: string }) =>
    api.delete(`/users/${user_id}`);

  getReadUsersMe = () => api.get(`/users/me`);

  login = ({ body }: { body: ILoginBody }) => api.post("/users/login", body);

  getReviews = () => api.get("/reviews");

  postCreateReview = ({ body }: { body: ICreateReviewBody }) =>
    api.post("/reviews", body);

  deleteReview = ({ review_id }: { review_id: string }) =>
    api.delete(`/reviews/${review_id}`);

  getReviewsByExhibition = ({ exhibition_id }: { exhibition_id: string }) =>
    api.get(`/reviews/exhibition/${exhibition_id}`);

  getReviewsByProject = ({ project_id }: { project_id: string }) =>
    api.get(`/reviews/project/${project_id}`);

  getClasses = () => api.get("/classes");

  postCreateClass = ({ body }: { body: IUpsertClassBody }) =>
    api.post("/classes", body);

  getClassById = ({ class_id }: { class_id: string }) =>
    api.get(`/classes/${class_id}`);

  putUpdateClass = ({
    class_id,
    body,
  }: {
    body: IUpsertClassBody;
    class_id: string;
  }) => api.put(`/classes/${class_id}`, body);

  deleteClass = ({ class_id }: { class_id: string }) =>
    api.delete(`/classes/${class_id}`);

  getExhibitions = () => api.get("/exhibitions");

  postCreateExhibition = ({ body }: { body: ICreateExhibitionBody }) =>
    api.post("/exhibitions", body);

  putUpdateExhibition = ({
    exhibition_id,
    body,
  }: {
    exhibition_id: string;
    body: IUpdateExhibitionBody;
  }) => api.put(`/exhibitions/${exhibition_id}`, body);

  deleteExhibition = ({ exhibition_id }: { exhibition_id: string }) =>
    api.delete(`/exhibitions/${exhibition_id}`);

  getProjects = ({
    company_name,
    exhibition_id,
    project_name,
  }: IGetProjectsParams) =>
    api.get("/projects", {
      params: {
        company_name,
        exhibition_id,
        project_name,
      },
    });

  postCreateProject = ({ body }: { body: ICreateProjectBody }) =>
    api.post("/projects", body);

  putUpdateProject = ({
    project_id,
    body,
  }: {
    project_id: string;
    body: IGetProjectsResponse;
  }) => api.put(`/projects/${project_id}`, body);

  deleteProject = ({ project_id }: { project_id: string }) =>
    api.delete(`/projects/${project_id}`);

  getProjectById = ({ project_id }: { project_id: string }) =>
    api.get(`/projects/${project_id}`);
}

export const ExpoApiService = new Service();
