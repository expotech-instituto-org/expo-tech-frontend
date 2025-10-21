export interface ICreateUserBody {
  age: number;
  class?: string;
  company?: string;
  email: string;
  knowledge: string;
  name: string;
  password: string;
  phone?: string;
  profile_picture?: string;
  role_id?: string;
}

export interface ILoginBody {
  username: string;
  password: string;
  grant_type?: string;
  scope?: string;
  client_id?: string;
  client_secret?: string;
}

export interface IGetUsersResponse {
  _id?: string;
  active?: boolean;
  age?: number;
  class?: string;
  company?: string;
  email?: string;
  knowledge?: string;
  password?: string;
  phone?: string;
  profile_picture?: string;
  project: {
    _id?: string;
    company_name?: string;
    name?: string;
  };
  reviews: {
    comment?: string;
    exhibition_id?: string;
    project_id?: string;
  }[];

  role: {
    _id?: string;
    name?: string;
  };
}

export interface IGetReadUsersMe {
  username: string;
  role: string;
}
