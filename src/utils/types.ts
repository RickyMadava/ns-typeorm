export type CreateUserParams = {
  username: string;
  password: string;
};

export type UpdateUserParams = {
  username: string;
  password: string;
};

export type CreateProfileParams = {
  firstName: string;
  lastName: string;
  age: number;
  dob: string;
};

export type CreatePostParams = {
  title: string;
  description: string;
  content: string;
};
