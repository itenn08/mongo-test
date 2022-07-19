export interface UserUpdateForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  role: string;
  country: string;
  city: string;
}

export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  role: string;
  country: string;
  city: string;
}
