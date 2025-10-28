export interface ICreateUserBody {
  age: number;
  class?: string;
  company?: string;
  email: string;
  knowledge?: string;
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
  name: string;
  active?: boolean;
  age: number;
  class: string;
  company?: string;
  email: string;
  knowledge?: string;
  password: string;
  phone?: string;
  profile_picture?: string;
  project?: {
    _id: string;
    company_name: string;
    name: string;
  };
  reviews?: {
    comment: string;
    exhibition_id: string;
    project_id: string;
    reviews?: {
      comment: string;
      exhibition_id: string;
      project_id: string;
    }[];
  };
  role: {
    _id: string;
    name: string;
  };
}

export interface IGetReadUsersMe {
  username: string;
  role: string;
}

export interface ICreateReviewBody {
  comment: string;
  exhibition_id: {
    id: string;
    name: string;
  };
  grades: {
    name: string;
    score: number;
    weight: number;
  }[];

  project: {
    id: string;
    name: string;
  };
}

export interface IGetReviewsResponse {
  _id: string;
  comment: string;
  exhibition_id: string;
  grades: {
    criteria: string;
    score: number;
    weight: number;
  }[];

  project: {
    _id: string;
    name: string;
  };
  user: {
    _id: string;
    name: string;
    role: {
      _id: string;
      name: string;
      weight: number;
    };
  };
}

export interface IGetReviewsByProjectResponse {
  _id: string;
  grades: {
    criteria: string;
    score: number;
    weight: number;
  }[];

  project_id: string;
}

export interface IGetClassesResponse {
  _id: string;
  ano: string;
  name: string;
}

export interface IUpsertClassBody {
  _id?: string;
  year: string;
  name: string;
}

export interface ICreateExhibitionBody {
  description?: string;
  end_date: string;
  image?: string;
  name: string;
  start_date: string;
  criteria: {
    name: string;
    weight: number;
  }[];
}

export interface IUpdateExhibitionBody {
  id: string;
  criteria: {
    name: string;
    weight: number;
  }[];
  date?: string;
  end_date: string;
  start_date: string;
  description?: string;
  image?: string;
  name: string;
  projects?: {
    _id: string;
    company_name: string;
    logo: string;
    name: string;
  }[];

  roles: {
    _id: string;
    name: string;
    weight: number;
  }[];
}

export interface IGetProjectsParams {
  exhibition_id?: string;
  project_name?: string;
  company_name?: string;
}

export interface IGetProjectsResponse {
  _id: string;
  company_name: string;
  coordinates: number;
  description: string;
  exhibition_id: string;
  expositors?: {
    _id: string;
    name: string;
  }[];
  images: string[];
  logo: string;
  name: string;
}

export interface ICreateProjectBody {
  name: string;
  company_name: string;
  description: string;
  images: string[];
  expositors: {
    id: string;
    name?: string;
  }[];
  coordinates: number;
  logo: string;
  exhibition_id: string;
}

export interface IIdAndName {
  _id: string;
  name: string;
}

export interface ILoginResponse {
  access_token: string;
  token_type: string;
}
