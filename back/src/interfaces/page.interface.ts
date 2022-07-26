import { Types } from "mongoose";

export interface Page extends Document {
  readonly title: string;
  readonly url: string;
  readonly content: string;
  readonly seoTitle: string;
  readonly seoDescription: string;
  readonly date: Date | null;
  readonly isActive: boolean;
}

export interface PageEdit {
  id: Types.ObjectId;
}
