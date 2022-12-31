export type CreateUserParams = {
  username: string;
  password: string;
};

export type CreatePostParams = {
  title: string;
  description: string;
};

export type CreateUserProfileParams = {
  firstname: string;
  lastname: string;
  age: number;
  dob: string;
};

export type UpdateUserParams = {
  username: string;
  password: string;
};
