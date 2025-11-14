import {
  ICreateExhibitionBody,
  ICreateProjectBody,
  ICreateReviewBody,
  ICreateRoleBody,
  ICreateUserBody,
  IGetProjectsParams,
  IGetUsersResponse,
  ILoginBody,
  IUpdateExhibitionBody,
  IUpdateUserBody,
  IUpsertClassBody,
} from "@/types/backendTypes";
import { api } from "./api";

class Service {
  getUsers = ({ name, role_id }: { name?: string; role_id?: string }) =>
    api.get("/users", {
      params: {
        name,
        role_id,
      },
    });

  postCreateUser = ({ body }: { body: ICreateUserBody }) => {
    const formData = new FormData();

    // Append o campo user como string JSON
    formData.append("user", JSON.stringify(body.user));

    // Se houver arquivo
    if (body.profile_picture) {
      // Supondo que body.profile_picture seja um File (ex: do <input type="file" />)
      formData.append("profile_picture", body.profile_picture);
    }

    return api.post("/users", formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data", // Axios define o boundary automaticamente, mas não machuca definir
      },
    });
  };

  getUserById = ({ user_id }: { user_id: string }) =>
    api.get(`/users/${user_id}`);

  putUpdateUser = async ({
    user_id,
    body,
  }: {
    body: IUpdateUserBody;
    user_id: string;
  }) => {
    const formData = new FormData();

    const { profile_picture, ...userData } = body;

    // user precisa ser um JSON string
    formData.append("user", JSON.stringify(userData));

    // Se tiver imagem nova (File), adiciona
    if (profile_picture && profile_picture instanceof File) {
      formData.append("profile_picture", profile_picture);
    }

    return api.put(`/users/${user_id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  deleteUser = ({ user_id }: { user_id: string }) =>
    api.delete(`/users/${user_id}`);

  getReadUsersMe = () => api.get(`/users/me`);

  login = ({ body }: { body: ILoginBody }) => {
    const params = new URLSearchParams();
    params.append("username", body.username);
    params.append("password", body.password);

    return api.post("/users/login", params.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  };

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

  getExhibitionsCurrent = () => api.get("/exhibitions/current/");
  getExhibitions = ({
    name,
    start_date,
  }: {
    name?: string;
    start_date?: string;
  }) =>
    api.get("/exhibitions", {
      params: {
        name,
        start_date,
      },
    });

  postCreateExhibition = ({ body }: { body: ICreateExhibitionBody }) => {
    const formData = new FormData();

    formData.append("exhibition", JSON.stringify(body.exhibition));
    formData.append("image", body.image); // precisa ser um File vindo do input

    return api.post("/exhibitions", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  putUpdateExhibition = ({
    exhibition_id,
    body,
  }: {
    exhibition_id: string;
    body: ICreateExhibitionBody;
  }) =>
    api.put(`/exhibitions/${exhibition_id}`, body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

  getExhibitionById = ({ exhibition_id }: { exhibition_id: string }) =>
    api.get(`/exhibitions/${exhibition_id}`);

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

  postCreateProject = ({ body }: { body: ICreateProjectBody }) => {
    return api.post("/projects", body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  putUpdateProject = ({
    project_id,
    body,
  }: {
    project_id: string;
    body: ICreateProjectBody;
  }) =>
    api.put(`/projects/${project_id}`, body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

  deleteProject = ({ project_id }: { project_id: string }) =>
    api.delete(`/projects/${project_id}`);

  getProjectById = ({ project_id }: { project_id: string }) =>
    api.get(`/projects/${project_id}`);

  getKnowledge = () => api.get("/knowledge");

  postCreateknowledge = ({ body }: { body: { name: string } }) =>
    api.post("/knowledge", body);

  getKnowledgeById = ({ knowledge_id }: { knowledge_id: string }) =>
    api.get(`/knowledge/${knowledge_id}`);

  putKnowledgeProject = ({
    knowledge_id,
    body,
  }: {
    knowledge_id: string;
    body: {
      _id: string;
      name: string;
    };
  }) => api.put(`/knowledge/${knowledge_id}`, body);

  deleteKnowledge = ({ knowledge_id }: { knowledge_id: string }) =>
    api.delete(`/knowledge/${knowledge_id}`);

  getCompanies = () => api.get("/companies/");

  postCreateCompanies = ({ body }: { body: { name: string } }) =>
    api.post("/companies", body);

  putCompaniesProject = ({
    company_id,
    body,
  }: {
    company_id: string;
    body: {
      _id: string;
      name: string;
    };
  }) => api.put(`/companies/${company_id}`, body);

  patchFavoriteProject = ({ project_id }: { project_id: string }) =>
    api.patch(`/users/favorite/${project_id}`);

  deleteCompanies = ({ company_id }: { company_id: string }) =>
    api.delete(`/companies/${company_id}`);

  getRoles = () => api.get("/roles");

  postCreateRole = ({ body }: { body: ICreateRoleBody }) =>
    api.post("/roles", body);

  getRoleById = ({ role_id }: { role_id: string }) =>
    api.get(`/roles/${role_id}`);

  getRoleDefault = () => api.get("/roles/default");

  putRole = ({ role_id, body }: { role_id: string; body: ICreateRoleBody }) =>
    api.put(`/roles/${role_id}`, body);
}

export const ExpoApiService = new Service();
