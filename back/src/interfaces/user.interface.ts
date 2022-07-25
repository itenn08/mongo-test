import { Document } from "mongoose";

export interface User extends Document {
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly dateOfBirth: Date | null;
  readonly role: string;
  readonly country: string;
  readonly city: string;
}

export interface UserEdited {
  email: string;
}
