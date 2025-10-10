import {
  ICreateUserBody,
  IGetUsersResponse,
  ILoginBody,
} from "@/types/backendTypes";
import { api } from "./api";

class Service {
  getUsers = () => api.get("/users");

  postCreateUser = ({ body }: { body: ICreateUserBody }) =>
    api.post("/users", body);

  getUserById = ({ user_id }: { user_id: string }) =>
    api.get(`/users/${user_id}`);

  putUser = ({ user_id, body }: { body: IGetUsersResponse; user_id: string }) =>
    api.put(`/users/${user_id}`, body);

  deleteUser = ({ user_id }: { user_id: string }) =>
    api.delete(`/users/${user_id}`);

  getReadUsersMe = () => api.get(`/users/me`);

  login = ({ body }: { body: ILoginBody }) => api.post("/users/login", body);
}

export const ExpoApiService = new Service();
